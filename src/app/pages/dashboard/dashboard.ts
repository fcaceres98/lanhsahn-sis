import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

interface Sale {
    id: number;
    user: string;
    type: 'Reservación' | 'Encomienda' | 'Penalidad';
    amount: number;
    date: Date;
}

interface UserSales {
    id: number;
    user: string;
    reservaciones: number;
    encomiendas: number;
    penalidades: number;
    total: number;
}

@Component({
    selector: 'app-dashboard',
    imports: [
        CommonModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit, OnDestroy {
    displayedColumns: string[] = ['time', 'user', 'type', 'amount'];

    isRefreshing = signal(false);
    lastUpdate: Date = new Date();

    totalToday = 2324.00;
    totalReservaciones = 1200.00;
    totalEncomiendas = 850.00;
    totalPenalidades = 274.00;

    userSalesData: UserSales[] = [
        { id: 1, user: 'Juan Pérez', reservaciones: 450, encomiendas: 320, penalidades: 80, total: 850 },
        { id: 2, user: 'María García', reservaciones: 380, encomiendas: 280, penalidades: 94, total: 754 },
        { id: 3, user: 'Carlos López', reservaciones: 370, encomiendas: 250, penalidades: 100, total: 720 }
    ];
    
    recentSales: Sale[] = [
        { id: 1, user: 'Juan Pérez', type: 'Reservación', amount: 125.00, date: new Date(2026, 1, 6, 14, 30) },
        { id: 2, user: 'María García', type: 'Encomienda', amount: 85.00, date: new Date(2026, 1, 6, 14, 15) },
        { id: 3, user: 'Carlos López', type: 'Penalidad', amount: 45.00, date: new Date(2026, 1, 6, 13, 45) },
        { id: 4, user: 'Juan Pérez', type: 'Reservación', amount: 150.00, date: new Date(2026, 1, 6, 13, 20) },
        { id: 5, user: 'María García', type: 'Reservación', amount: 95.00, date: new Date(2026, 1, 6, 12, 50) },
        { id: 6, user: 'Carlos López', type: 'Encomienda', amount: 110.00, date: new Date(2026, 1, 6, 12, 15) },
        { id: 7, user: 'Juan Pérez', type: 'Encomienda', amount: 75.00, date: new Date(2026, 1, 6, 11, 40) },
        { id: 8, user: 'María García', type: 'Penalidad', amount: 50.00, date: new Date(2026, 1, 6, 11, 10) },
        { id: 9, user: 'Carlos López', type: 'Reservación', amount: 135.00, date: new Date(2026, 1, 6, 10, 30) },
        { id: 10, user: 'Juan Pérez', type: 'Reservación', amount: 100.00, date: new Date(2026, 1, 6, 9, 45) }
    ];

    charts: { [key: string]: Chart } = {};
    private themeObserver?: MutationObserver;

    ngOnInit() {
        setTimeout(() => {
            this.createCharts();
            this.observeThemeChanges();
        }, 100);
    }

    ngOnDestroy() {
        Object.values(this.charts).forEach(chart => chart.destroy());
    }
    
    private observeThemeChanges(): void {
        const targetNode = document.body;

        const config = {
            attributes: true,
            attributeFilter: ['class']
        };

        this.themeObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    setTimeout(() => {
                        this.updateChartsTheme();
                    }, 50);
                }
            });
        });

        this.themeObserver.observe(targetNode, config);
    }
    
    private updateChartsTheme(): void {
        const isDarkMode = document.body.classList.contains('dark-mode');
        const onPrimaryColor = isDarkMode ? '#FFFFFF' : '#000000';
        
        this.userSalesData.forEach((userData, index) => {
            const chart = this.charts[`chart-${index}`];
            if (chart) {
                const scales = chart.options.scales;
                if (scales) {
                    const xScale = scales['x'];
                    const yScale = scales['y'];

                    if (xScale && xScale.ticks) {
                        xScale.ticks.color = onPrimaryColor;
                    }
                    if (yScale && yScale.ticks) {
                        yScale.ticks.color = onPrimaryColor;
                    }
                }

                chart.update('none');
            }
        });
    }
    
    async refreshData(): Promise<void> {
        this.isRefreshing.set(true);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        this.updateRandomData();
        
        setTimeout(() => {
            this.updateCharts();
            this.lastUpdate = new Date();
            this.isRefreshing.set(false);
        }, 100);
    }

    updateRandomData(): void {
        const variation = () => (Math.random() - 0.5) * 200;

        this.totalReservaciones = Math.max(1000, this.totalReservaciones + variation());
        this.totalEncomiendas = Math.max(700, this.totalEncomiendas + variation());
        this.totalPenalidades = Math.max(200, this.totalPenalidades + variation());
        this.totalToday = this.totalReservaciones + this.totalEncomiendas + this.totalPenalidades;
        
        this.userSalesData = this.userSalesData.map(user => {
            const reservaciones = Math.max(200, user.reservaciones + (Math.random() - 0.5) * 100);
            const encomiendas = Math.max(150, user.encomiendas + (Math.random() - 0.5) * 80);
            const penalidades = Math.max(50, user.penalidades + (Math.random() - 0.5) * 40);

            return {
                ...user,
                reservaciones,
                encomiendas,
                penalidades,
                total: reservaciones + encomiendas + penalidades
            };
        });
        
        const users = ['Juan Pérez', 'María García', 'Carlos López'];
        const types: ('Reservación' | 'Encomienda' | 'Penalidad')[] = ['Reservación', 'Encomienda', 'Penalidad'];

        const newSale: Sale = {
            id: this.recentSales[0].id + 1,
            user: users[Math.floor(Math.random() * users.length)],
            type: types[Math.floor(Math.random() * types.length)],
            amount: Math.floor(Math.random() * 150) + 50,
            date: new Date()
        };

        this.recentSales = [newSale, ...this.recentSales.slice(0, 9)];
    }

    updateCharts(): void {
        this.userSalesData.forEach((userData, index) => {
            const chart = this.charts[`chart-${index}`];
            if (chart) {
                chart.data.datasets[0].data = [
                    userData.reservaciones,
                    userData.encomiendas,
                    userData.penalidades
                ];
                
                chart.update();
            }
        });
    }

    createCharts(): void {
        this.userSalesData.forEach((userData, index) => {
            this.createUserChart(userData, index);
        });
    }

    createUserChart(userData: UserSales, index: number): void {
        const canvas = document.getElementById(`chart-${index}`) as HTMLCanvasElement;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        if (this.charts[`chart-${index}`]) {
            this.charts[`chart-${index}`].destroy();
        }

        const isDarkMode = document.body.classList.contains('dark-mode');
        const onPrimaryColor = isDarkMode ? '#FFFFFF' : '#000000';

        const config: ChartConfiguration = {
            type: 'bar',
            data: {
                labels: ['Reservaciones', 'Encomiendas', 'Penalidades'],
                datasets: [{
                    data: [userData.reservaciones, userData.encomiendas, userData.penalidades],
                    backgroundColor: [
                        'rgba(103, 58, 183, 0.8)',
                        'rgba(33, 150, 243, 0.8)',
                        'rgba(156, 39, 176, 0.8)'
                    ],
                    borderColor: [
                        'rgba(103, 58, 183, 1)',
                        'rgba(33, 150, 243, 1)',
                        'rgba(156, 39, 176, 1)'
                    ],
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 750,
                    easing: 'easeInOutQuart'
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const value = context.parsed.y;
                                return value !== null ? `$${value.toFixed(2)}` : '$0.00';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: onPrimaryColor,
                            font: {
                                size: 12,
                                weight: 'bold'
                            }
                        }, grid: {
                            display: false
                        }
                    }, y: {
                        beginAtZero: true,
                        ticks: {
                            color: onPrimaryColor,
                            font: {
                                size: 11
                            }, callback: (value) => `$${value}`
                        }
                    }
                }
            }
        };

        this.charts[`chart-${index}`] = new Chart(ctx, config);
    }

    getTypeIcon(type: string): string {
        switch(type) {
            case 'Reservación': return 'event_seat';
            case 'Encomienda': return 'local_shipping';
            case 'Penalidad': return 'warning';
            default: return 'attach_money';
        }
    }

    getTypeClass(type: string): string {
        switch(type) {
            case 'Reservación': return 'type-reservacion';
            case 'Encomienda': return 'type-encomienda';
            case 'Penalidad': return 'type-penalidad';
            default: return '';
        }
    }

    formatTime(date: Date): string {
        return date.toLocaleTimeString('es-HN', { hour: '2-digit', minute: '2-digit' });
    }

    formatDate(date: Date): string {
        return date.toLocaleDateString('es-HN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    formatLastUpdate(): string {
        return this.lastUpdate.toLocaleTimeString('es-HN', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });
    }
}
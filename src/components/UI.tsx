import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Button({ 
  className, 
  variant = 'primary', 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'danger' }) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'bg-white/10 text-white hover:bg-white/20',
    outline: 'border border-white/10 text-slate-300 hover:bg-white/5',
    danger: 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20',
  };
  
  return (
    <button 
      className={cn(
        'px-4 py-2 min-h-[44px] rounded-[10px] font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2',
        variants[variant],
        className
      )} 
      {...props} 
    />
  );
}

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('card', className)} {...props}>
      {children}
    </div>
  );
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input 
      className={cn(
        'w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-sm focus:outline-none focus:border-primary-start transition-all placeholder:text-slate-600',
        className
      )} 
      {...props} 
    />
  );
}

export function Badge({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'success' | 'warning' | 'error' | 'info' }) {
  const variants = {
    default: 'bg-slate-500/10 text-slate-500',
    success: 'bg-emerald-500/10 text-emerald-500',
    warning: 'bg-orange-500/10 text-orange-500',
    error: 'bg-red-500/10 text-red-500',
    info: 'bg-blue-500/10 text-blue-500',
  };
  
  return (
    <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider', variants[variant])}>
      {children}
    </span>
  );
}

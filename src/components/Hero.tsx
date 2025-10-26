"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Download, Mail, Calendar, MapPin, Code, Sparkles, Zap } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-in-left">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-purple-400 font-medium">Full-Stack Developer</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold animate-fade-in leading-tight">
                Hei, jeg er{" "}
                <span className="text-gradient">
                  Birk Ramstad
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl animate-slide-up leading-relaxed">
                Full-stack utvikler med lidenskap for å skape innovative løsninger 
                som gjør en forskjell. Spesialisert i moderne webteknologier og 
                brukeropplevelse.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 neon-glow hover-glow transition-all duration-300">
                <Download className="w-4 h-4 mr-2" />
                Last ned CV
              </Button>
              <Button variant="outline" size="lg" className="border-purple-500/50 hover:border-purple-400 hover-glow" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                <Mail className="w-4 h-4 mr-2" />
                Kontakt meg
              </Button>
            </div>

            <div className="flex items-center space-x-6 pt-6">
              <div className="flex items-center space-x-2 glass rounded-full px-3 py-2">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span className="text-sm">Trondheim/Oslo, Norge</span>
              </div>
              <div className="flex items-center space-x-2 glass rounded-full px-3 py-2">
                <Calendar className="w-4 h-4 text-green-400" />
                <span className="text-sm">Født 2003</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end animate-slide-in-right">
            <div className="relative">
              {/* Main avatar circle with gradient border */}
              <div className="gradient-border p-1">
                <div className="w-80 h-80 rounded-full flex items-center justify-center glass relative overflow-hidden">
                  <Avatar className="w-72 h-72 rounded-full">
                    <AvatarImage src="/Selvportrett-kopi.png" alt="Birk Ramstad" className="object-cover" />
                    <AvatarFallback className="text-6xl font-bold text-gradient bg-transparent">
                      BR
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce neon-glow">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center animate-pulse">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

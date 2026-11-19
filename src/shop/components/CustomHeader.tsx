import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { cn } from "@/lib/utils";
import { CustomLogo } from "@/components/custom/CustomLogo";
import { useAuthStore } from "@/auth/store/auth.store";


export const CustomHeader = () => {

    
    const [searchParams, setSearchParams] = useSearchParams();
    const {authStatus, isAdmin, logout} = useAuthStore();
    const { gender }= useParams();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileMenuMounted, setIsMobileMenuMounted] = useState(false);
    const menuCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            if (menuCloseTimeout.current) clearTimeout(menuCloseTimeout.current);
        };
    }, []);

    const openMobileMenu = () => {
        if (menuCloseTimeout.current) clearTimeout(menuCloseTimeout.current);
        setIsMobileMenuMounted(true);
        requestAnimationFrame(() => setIsMobileMenuOpen(true));
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        menuCloseTimeout.current = setTimeout(() => {
            setIsMobileMenuMounted(false);
            menuCloseTimeout.current = null;
        }, 200);
    };

    const toggleMobileMenu = () => {
        if (isMobileMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    };

    const query = searchParams.get('query') || '';

    const handleSearch = (event: KeyboardEvent<HTMLInputElement>)=>{
        if (event.key !== 'Enter') return;

        const query = inputRef.current?.value.trim().toLowerCase();
        const newSearchParams = new URLSearchParams();

        if (query) {
            newSearchParams.set('query', query);
        }



        setSearchParams(newSearchParams);
    }

    return <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8 relative">
            <div className="flex h-16 items-center justify-between gap-2">
                {/* Logo */}
                <div className="shrink-0">
                    <CustomLogo/>
                </div>

                {/* Navigation - Desktop */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link to="/" className={cn(`text-sm font-medium transition-colors hover:text-primary`, !gender ? 'underline underline-offset-4' : '')}>
                        Todos
                    </Link>
                    <Link to="/gender/men" className={cn(`text-sm font-medium transition-colors hover:text-primary`, gender === 'men' ? 'underline underline-offset-4' : '')}>
                        Hombres
                    </Link>
                    <Link to="/gender/women" className={cn(`text-sm font-medium transition-colors hover:text-primary`, gender === 'women' ? 'underline underline-offset-4' : '')}>
                        Mujeres
                    </Link>
                    <Link to="/gender/kid" className={cn(`text-sm font-medium transition-colors hover:text-primary`, gender === 'kid' ? 'underline underline-offset-4' : '')}>
                        Niños
                    </Link>
                </nav>

                {/* Search and Cart */}
                <div className="flex min-w-0 flex-1 items-center space-x-1 sm:space-x-4 md:flex-none">
                    <div className="flex flex-1 items-center md:flex-none">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input ref={inputRef} placeholder="Buscar productos..." className="pl-9 w-full md:w-64 h-9"
                               onKeyDown= {handleSearch} 
                               defaultValue={query}
                            />
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                        aria-expanded={isMobileMenuOpen}
                        onClick={toggleMobileMenu}
                    >
                        {isMobileMenuOpen
                            ? <X className="h-5 w-5" />
                            : <Menu className="h-5 w-5" />}
                    </Button>

                    {
                        authStatus === 'not-authenticated'?(

                            <Link to="/auth/login" className="hidden md:inline-flex">
                                <Button variant="default" size="sm" className="ml-2">
                                    Login
                                </Button>
                            </Link>
                        ):(

                            
                                <Button onClick={logout} variant="outline" size="sm" className="ml-2 hidden md:inline-flex">
                                    Cerrar Sesión
                                </Button>
                            
                        )
                    }

                    {
                        isAdmin() &&(
                            <Link to="/admin" className="hidden md:inline-flex">
                                <Button variant="secondary" size="sm" className="ml-2">
                                    Admin
                                </Button>
                            </Link>

                        )
                    }

                </div>
            </div>

            {isMobileMenuMounted && (
                <nav className={cn(
                    "absolute left-0 right-0 top-full border-b bg-slate-50 px-4 py-4 shadow-md transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none md:hidden",
                    isMobileMenuOpen
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-2 pointer-events-none opacity-0"
                )}>
                    <div className="flex flex-col gap-2">
                        <Link
                            to="/"
                            onClick={closeMobileMenu}
                            className={cn("rounded-md px-3 py-2 text-sm font-medium", !gender ? "bg-slate-200" : "")}
                        >
                            Todos
                        </Link>
                        <Link
                            to="/gender/men"
                            onClick={closeMobileMenu}
                            className={cn("rounded-md px-3 py-2 text-sm font-medium", gender === "men" ? "bg-slate-200" : "")}
                        >
                            Hombres
                        </Link>
                        <Link
                            to="/gender/women"
                            onClick={closeMobileMenu}
                            className={cn("rounded-md px-3 py-2 text-sm font-medium", gender === "women" ? "bg-slate-200" : "")}
                        >
                            Mujeres
                        </Link>
                        <Link
                            to="/gender/kid"
                            onClick={closeMobileMenu}
                            className={cn("rounded-md px-3 py-2 text-sm font-medium", gender === "kid" ? "bg-slate-200" : "")}
                        >
                            Niños
                        </Link>

                        {authStatus === "not-authenticated" ? (
                            <Link
                                to="/auth/login"
                                onClick={closeMobileMenu}
                                className="mt-2"
                            >
                                <Button variant="default" size="sm" className="w-full">
                                    Login
                                </Button>
                            </Link>
                        ) : (
                            <Button
                                onClick={() => {
                                    logout();
                                    closeMobileMenu();
                                }}
                                variant="outline"
                                size="sm"
                                className="mt-2 w-full"
                            >
                                Cerrar Sesión
                            </Button>
                        )}

                        {isAdmin() && (
                            <Link
                                to="/admin"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Button variant="secondary" size="sm" className="mt-1 w-full">
                                    Admin
                                </Button>
                            </Link>
                        )}
                    </div>
                </nav>
            )}
        </div>
    </header>;
};

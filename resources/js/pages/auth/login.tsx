import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { Compass, Eye, EyeOff } from 'lucide-react'; // ✅ Added Eye icons
import { useState } from 'react'; // ✅ Added useState

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({ status, canResetPassword, canRegister }: Props) {
    // ✅ State for password visibility
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex min-h-screen w-full flex-col md:flex-row bg-white">
            <Head title="Log in" />

            {/* --- LEFT SIDE: BRANDING PANEL --- */}
            <div className="relative hidden w-full md:flex md:w-1/2 lg:w-[55%] flex-col overflow-hidden p-12 text-white">
                <img 
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200" 
                    className="absolute inset-0 h-full w-full object-cover"
                    alt="Labrador Coast"
                />
                
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-transparent" />

                <div className="relative z-10 flex h-full flex-col justify-between">
                    <div className="flex items-center gap-2 drop-shadow-md">
                        <Compass className="h-7 w-7 text-blue-400" />
                        <span className="text-lg font-black uppercase tracking-[0.2em]">TechTrek Labrador</span>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-5xl lg:text-7xl font-black leading-none tracking-tighter uppercase drop-shadow-2xl">
                            Welcome Back <br /> to Paradise
                        </h1>
                        <p className="max-w-md text-lg font-bold text-white/90 italic drop-shadow-md">
                            Experience the warmth and beauty of Labrador, Pangasinan.
                        </p>
                    </div>

                    <div className="text-[10px] font-black uppercase tracking-widest opacity-60">
                        &copy; 2026 Municipal Tourism Office of Labrador
                    </div>
                </div>
            </div>

            {/* --- RIGHT SIDE: LOGIN FORM --- */}
            <div className="flex w-full flex-1 flex-col justify-center px-8 py-12 md:w-1/2 lg:w-[45%] xl:px-24">
                <div className="mx-auto w-full max-w-sm space-y-10">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Login Account</h2>
                        <p className="text-sm font-medium text-slate-500">
                            Enter your credentials to access your portal.
                        </p>
                    </div>

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="flex flex-col gap-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            className="h-12 border-slate-200 bg-slate-50/50 rounded-lg focus:ring-blue-600"
                                            placeholder="you@example.com"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    {/* ✅ Updated Password Field with Toggle */}
                                    <div className="grid gap-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</Label>
                                            {canResetPassword && (
                                                <TextLink href={request()} className="text-xs font-bold text-blue-600">
                                                    Forgot Password?
                                                </TextLink>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                required
                                                className="h-12 border-slate-200 bg-slate-50/50 rounded-lg focus:ring-blue-600 pr-10"
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="remember" name="remember" className="rounded-md border-slate-300" />
                                        <Label htmlFor="remember" className="text-sm font-bold text-slate-600">Remember me</Label>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="h-12 w-full bg-blue-600 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all rounded-lg"
                                        disabled={processing}
                                    >
                                        {processing ? <Spinner /> : 'Log In'}
                                    </Button>
                                </div>

                                {canRegister && (
                                    <div className="text-center text-sm font-bold text-slate-500">
                                        New traveler?{' '}
                                        <TextLink href={register()} className="text-blue-600 hover:underline">
                                            Create Account
                                        </TextLink>
                                    </div>
                                )}
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
}
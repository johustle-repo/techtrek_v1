import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';
import { Compass, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function Register() {
    // ✅ Individual states for visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="flex min-h-screen w-full flex-col md:flex-row bg-white">
            <Head title="Register" />

            {/* --- LEFT SIDE: REGISTER FORM --- */}
            <div className="flex w-full flex-1 flex-col justify-center px-8 py-12 md:w-1/2 lg:w-[40%] xl:px-24">
                <div className="mx-auto w-full max-sm:max-w-xs space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Create Account</h2>
                        <p className="text-sm font-medium text-slate-500">
                            Join the community and explore Labrador.
                        </p>
                    </div>

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password', 'password_confirmation']}
                        disableWhileProcessing
                        className="flex flex-col gap-5"
                        href='/register'
                        method="post"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-4">
                                    {/* Name and Email Fields */}
                                    <div className="grid gap-1.5">
                                        <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</Label>
                                        <Input id="name" type="text" name="name" required autoFocus className="h-11 border-slate-200 bg-slate-50/50 rounded-lg focus:ring-blue-600" placeholder="Juan Dela Cruz" />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</Label>
                                        <Input id="email" type="email" name="email" required className="h-11 border-slate-200 bg-slate-50/50 rounded-lg focus:ring-blue-600" placeholder="juan@example.com" />
                                        <InputError message={errors.email} />
                                    </div>

                                    {/* ✅ Individual Password Toggle */}
                                    <div className="grid gap-1.5">
                                        <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                required
                                                className="h-11 border-slate-200 bg-slate-50/50 rounded-lg focus:ring-blue-600 pr-10"
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

                                    {/* ✅ Individual Confirm Password Toggle */}
                                    <div className="grid gap-1.5">
                                        <Label htmlFor="password_confirmation" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Confirm Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="password_confirmation"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                name="password_confirmation"
                                                required
                                                className="h-11 border-slate-200 bg-slate-50/50 rounded-lg focus:ring-blue-600 pr-10"
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                                            >
                                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        <InputError message={errors.password_confirmation} />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="h-12 w-full mt-2 bg-blue-600 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all rounded-lg"
                                        disabled={processing}
                                    >
                                        {processing ? <Spinner /> : 'Create Account'}
                                    </Button>
                                </div>

                                <div className="text-center text-sm font-bold text-slate-500">
                                    Already a member?{' '}
                                    <TextLink href={login()} className="text-blue-600 hover:underline">
                                        Log in here
                                    </TextLink>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>

            {/* --- RIGHT SIDE: BRANDING PANEL --- */}
            <div className="relative hidden w-full md:flex md:w-1/2 lg:w-[60%] flex-col overflow-hidden p-12 text-white">
                <img 
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200" 
                    className="absolute inset-0 h-full w-full object-cover"
                    alt="Labrador Coast"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-transparent" />

                <div className="relative z-10 flex h-full flex-col justify-between items-start text-left">
                    <div className="flex items-center gap-2 drop-shadow-md">
                        <Compass className="h-7 w-7 text-blue-400" />
                        <span className="text-lg font-black uppercase tracking-[0.2em]">TechTrek Labrador</span>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-5xl lg:text-7xl font-black leading-none tracking-tighter uppercase drop-shadow-2xl">
                            Start Your <br /> Adventure
                        </h1>
                        <p className="max-w-md text-lg font-bold text-white/90 italic drop-shadow-md">
                            Your gateway to the hidden treasures of Pangasinan.
                        </p>
                    </div>

                    <div className="text-[10px] font-black uppercase tracking-widest opacity-60">
                        &copy; 2026 Municipal Tourism Office of Labrador
                    </div>
                </div>
            </div>
        </div>
    );
}
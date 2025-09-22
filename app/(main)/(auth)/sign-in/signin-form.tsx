"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/validators/authValidators";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LogIn, Mail, Lock, Sparkles, Shield, Zap } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../../../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormFieldset,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { FormError } from "../../../../components/FormError";
import { signIn, useSession } from "@/lib/auth-client";

type SignInValues = yup.InferType<typeof signInSchema>;

const SigninForm = () => {
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const form = useForm<SignInValues>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInValues) => {
    try {
      setIsLoading(true);
      setFormError("");

      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.ok) {
        toast.success("Login Successful", {
          description: "Welcome back to your dashboard",
          icon: <Shield className="h-4 w-4 text-green-500" />,
        });
        router.push("/admin/dashboard");
        return;
      }

      const message =
        res?.error ||
        "Invalid credentials. Please check your email and password.";
      setFormError(message);
      toast.error("Login Failed", {
        description: message,
        icon: <Shield className="h-4 w-4 text-red-500" />,
      });
    } catch (e: any) {
      const message = e?.message || "Something went wrong while signing in.";
      setFormError(message);
      toast.error("Login Error", {
        description: message,
        icon: <Shield className="h-4 w-4 text-orange-500" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-slate-100 relative overflow-hidden p-4 ">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-200/20 via-transparent to-transparent"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div 
        className="relative w-full max-w-lg transform transition-all duration-700"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Floating particles */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-300 to-blue-400 rounded-full blur-sm animate-float"></div>
        <div className="absolute -bottom-2 -right-4 w-6 h-6 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full blur-sm animate-float delay-1000"></div>
        
        <Card className="w-full bg-white/90 backdrop-blur-xl border border-blue-200/50 shadow-2xl overflow-hidden relative">
          {/* Animated border gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100 -z-10"></div>
          <div className="absolute inset-[1px] bg-white rounded-lg z-0"></div>
          
          <div className="relative z-10">
            <CardHeader className="pb-6 pt-8 relative">
              {/* Animated header background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-blue-50/30 to-blue-200/30"></div>
              
              <div className="flex justify-center mb-6 relative">
                <div className={`relative transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full blur-md opacity-40 animate-pulse"></div>
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center relative border-2 border-blue-200/50 shadow-lg">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                      <LogIn className="h-8 w-8 text-white relative z-10" />
                    </div>
                  </div>
                  <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-blue-400 animate-spin" />
                </div>
              </div>
              
              <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-center text-blue-600/80 mt-2 flex items-center justify-center gap-2">
                <Zap className="h-4 w-4 text-blue-500" />
                Sign in to access your account
                <Shield className="h-4 w-4 text-green-500" />
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6 relative">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormFieldset>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-blue-900 flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Email
                          </FormLabel>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-blue-400" />
                            </div>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Enter your email address"
                                autoComplete="email"
                                className="pl-10 pr-4 py-3 h-12 bg-blue-50/50 border-blue-200/50 text-blue-900 placeholder-blue-400/70 focus:border-blue-400/50 transition-all duration-300"
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-blue-900 flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            Password
                          </FormLabel>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock className="h-5 w-5 text-blue-400" />
                            </div>
                            <FormControl>
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                className="pl-10 pr-12 py-3 h-12 bg-blue-50/50 border-blue-200/50 text-blue-900 placeholder-blue-400/70 focus:border-blue-400/50 transition-all duration-300"
                                {...field}
                              />
                            </FormControl>
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600 transition-colors duration-200 p-1"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </FormFieldset>

                  <FormError message={formError} />

                  <div className="flex items-center justify-between text-sm">
                    <Link
                      href="/auth/forgot-password"
                      className="text-blue-600 hover:text-blue-800 font-medium transition-all duration-300 hover:underline flex items-center gap-1"
                    >
                      <Shield className="h-4 w-4" />
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25 relative overflow-hidden group"
                    disabled={isLoading}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    {isLoading ? (
                      <div className="flex items-center justify-center relative z-10">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Signing in...
                      </div>
                    ) : (
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Zap className="h-5 w-5" />
                        Sign In
                      </span>
                    )}
                  </Button>
                </form>
              </Form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-blue-200/50"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-blue-600/80">New to our platform?</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-blue-600/80 mb-4">
                  Don't have an account yet?
                </p>
                <Link href="/sign-up">
                  <Button
                    variant="outline"
                    className="w-full h-12 border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-400 font-medium transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Create Account
                    </span>
                  </Button>
                </Link>
              </div>
            </CardContent>

            <CardFooter className="bg-blue-50/30 py-4 border-t border-blue-200/50">
              <p className="text-xs text-center text-blue-600/70 w-full flex items-center justify-center gap-1">
                <Shield className="h-3 w-3 text-green-500" />
                Secure authentication • 
                <Link href="/terms" className="text-blue-600 hover:text-blue-800 transition-colors hover:underline ml-1">
                  Terms
                </Link>{" "}
                • 
                <Link href="/privacy" className="text-blue-600 hover:text-blue-800 transition-colors hover:underline">
                  Privacy
                </Link>
              </p>
            </CardFooter>
          </div>
        </Card>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SigninForm;
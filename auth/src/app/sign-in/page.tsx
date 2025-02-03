"use client"

//shadcn ui

import { Button } from "@/components/ui/button";

import {
    Card,
    CardHeader,
    CardDescription,
    CardContent,
    CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";


//react icons
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";



const SignIn = () => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [pending, setPending] = useState(false)
    const router = useRouter()
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => { //e = event
        e.preventDefault()
        setPending(true);

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        })

        if (res?.ok) {
            router.push("/"); //home page     
            toast.success("Login seccessful");

        } else if (res?.status === 401) {
            setError("Invalid credentials");
            setPending(false);

        } else {
            setError("Something went wrong !")
        }
    }

    const handleProvider = (
        event: React.MouseEvent<HTMLButtonElement>,
        value: "github" | "google"
    ) => { 
        event.preventDefault();
        signIn(value, {callbackUrl: "/"});
    }

  return (
    <div className="h-full flex items-center justify-center bg-[#1b0918]">
        <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8">            {/* sm: small screen */}
            <CardHeader>
                <CardTitle className="text-center">
                    Sign In
                </CardTitle>
                <CardDescription className="text-sm text-center text-accent-foreground">
                    Use email or services, to sign in
                </CardDescription>
            </CardHeader>
            {/* //error message */}
            {!!error && (
                <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                    <TriangleAlert />
                    <p>{error}</p>
                </div>
            )}
            <CardContent className="px-2 sm:px-6">
                <form onSubmit={handleSubmit} className="space-y-3">
                    
                    <Input 
                        type="email"
                        disabled={pending}
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value) }
                        required
                    />
                    <Input 
                        type="password"
                        disabled={pending}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    
                    <button
                        className="w-full px-6 py-3 font-medium bg-black text-white rounded-lg disabled:opacity-50"
                        disabled = {pending}
                    >
                        continue
                    </button>
                </form>      
                <Separator />  
                <div className="flex my-2 justify-evenly mx-auto items-center">
                    <Button
                        disabled={false}
                        onClick={(e) => handleProvider(e, "google")}
                        variant="outline"
                        size="lg"
                        className="bg-slate-300 hover:bg-slate-400 hover:scale-110"
                    >
                        <FcGoogle className="size-10 left-2.5 top-2.5"/>
                    </Button>
                    <Button
                        disabled={false}
                        onClick={(e) => handleProvider(e, "github")}
                        variant="outline"
                        size="lg"
                        className="bg-slate-300 hover:bg-slate-400 hover:scale-110"
                    >
                        <FaGithub className="size-10 left-2.5 top-2.5"/>
                    </Button>
                </div>    
                <p className="text-center text-sm mt-2 text-muted-foreground">
                    You don't have an account?
                    <Link className="text-sky-700 ml-4 hover:underline cursor-pointer" href="sign-up">Sign Up</Link>
                </p>   
            </CardContent>
        </Card>
    </div>
  )
}

export default SignIn



/* mongodb user : 
next-auth
next-auth-2025 
*/
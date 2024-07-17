import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "@/assets/collect.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/services/AuthContext";
import { useContext, useState } from "react";

function ImageLogin() {
  return (
    <img
      src={logo}
      alt="Logo"
      width="1920"
      height="1080"
      className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
    />
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async () => {
    try {
      console.log("REQ===>",username,password);
      const resp = await login(username, password);

      if (resp) navigate("/");
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center bg-muted justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Entrez votre email et votre mot de passe pour vous connecter
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="email">Email</Label>
              </div>
              <Input
                id="email"
                type="email"
                placeholder="mail@jakaranda.com"
                required
                value={username} onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Mot de passe</Label>
              </div>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Login
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <ImageLogin />
      </div>
    </div>
  );
}


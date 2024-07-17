import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { addUserSA } from "@/services/application/user.sa";
import { useNavigate } from "react-router-dom";

export function AddUser() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async () => {
    try {
      const userData = {
        "username": username,
        "email": email,
        "password": "azerty",
        "role": role,
        "phoneNumber": phoneNumber
      }
      const resp = await addUserSA(userData);

      if (resp) navigate("/dashboard/users");
    } catch (error) {
      alert('Creating user failed');
    }
  };

  return (
    <Card className="mx-auto max-w mt-40">
      <CardHeader>
        <CardTitle className="text-xl">Création d'utilisateur</CardTitle>
        <CardDescription>
          Entrez les données pour créer le compte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Name</Label>
              <Input id="first-name" placeholder="Name" required value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Role</Label>
              <Input id="role" placeholder="Role" required value={role} onChange={(e) => setRole(e.target.value)}/>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="mail@jakaranda.com"
              required
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Telephone</Label>
            <Input
              id="phoneNumber"
              type="phone"
              placeholder="+261XXX"
              required
              value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            Valider
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

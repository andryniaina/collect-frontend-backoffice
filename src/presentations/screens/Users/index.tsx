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

export function AddUser() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Création d'utilisateur</CardTitle>
        <CardDescription>
          Entrez vos données pour créer votre compte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Name</Label>
              <Input id="first-name" placeholder="Name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Role</Label>
              <Input id="role" placeholder="Role" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="mail@jakaranda.com"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Valider
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

import { Button, Card, CardContent, CardFooter } from "@chghealthcare/unified-design-system"
import "@chghealthcare/unified-design-system/styles.css"

export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <Card>
        <CardContent>
          <p>Consumer fixture</p>
        </CardContent>
        <CardFooter>
          <Button type="button" variant="default">
            Button from @chghealthcare/unified-design-system
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

import { Button, Card, CardContent, CardHeader, CardTitle } from "@chghealthcare/unified-design-system"
import "@chghealthcare/unified-design-system/styles.css"

export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <Card>
        <CardHeader>
          <CardTitle>Consumer fixture</CardTitle>
        </CardHeader>
        <CardContent>
          <Button type="button" variant="default">
            Button from @chghealthcare/unified-design-system
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

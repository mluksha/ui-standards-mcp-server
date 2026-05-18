
    import { McpServer, StdioServerTransport } from "@modelcontextprotocol/server";
    import { z } from "zod";

    const server = new McpServer({
      name: "ui-standards-server",
      version: "1.0.0"
    });

    server.registerTool(
      "get_standard",
      { 
        description: "Get a UI standard by its code (e.g., KT-001-2026)",
        inputSchema: z.object({ code: z.string() })
      },
      async ({ code }) => {
        if (code === "KT-001-2026") {
          return {
            content: [
              {
                type: "text",
                text: `KT-001-2026 UI Standard:
- Buttons must be large (min height 48px)
- Buttons must be high contrast
- Light background is NOT allowed
- Use primary color palette`
              }
            ]
          };
        }
        return { content: [{ type: "text", text: "Standard not found" }] };
      }
    );

    server.registerTool(
      "list_standards",
      {
        description: "List all available UI standards"
      },
      async () => ({
        content: [{ type: "text", text: "Available standards: KT-001-2026" }]
      })
    );

    server.registerResource(
      "kt-001-2026",
      "standard://kt-001-2026",
      {},
      async () => ({
        contents: [
          {
            uri: "standard://kt-001-2026",
            mimeType: "text/plain",
            text: `KT-001-2026:
Buttons must be large, high contrast, no light backgrounds`
          }
        ]
      })
    );

    server.registerPrompt(
      "generate-ui-with-standard",
      { argsSchema: z.object({ standardCode: z.string(), page: z.string() }) },
      async ({ standardCode, page }) => ({
        messages: [
          {
            role: "user",
            content: `Generate UI for ${page} page following standard ${standardCode}. Ensure compliance.`
          }
        ]
      })
    );

    const transport = new StdioServerTransport();
    await server.connect(transport);

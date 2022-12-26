```mermaid
sequenceDiagram
browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
server-->>browser: status code 201
note over browser: js handles response and renders a new note
```
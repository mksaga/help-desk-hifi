👋 This repo hosts Mohamed's help desk implementation.

`core/` holds the Express backend powering the help desk, running at `https://help-desk-hifi.onrender.com`, as well as logic to connect to storage powered by Supabase.

```bash
curl https://help-desk-hifi.onrender.com/tickets
```

`web-ui/` holds the NextJS frontend, running at `https://help-desk-hifi.vercel.app`.
Create ticket URL: `https://help-desk-hifi.vercel.app/`
Dashboard URL: `https://help-desk-hifi.vercel.app/dashboard`
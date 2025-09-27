## pinotp — React OTP / PIN input component

pinotp is a small, accessible, and customizable React component for entering OTPs or PINs. It focuses on a good developer experience and ships with a minimal build setup.

Features

- Lightweight and focused on PIN/OTP entry
- Works with React 18+ / 19+
- Customizable styles and behavior

Installation

Install the package and add React as a peer dependency in your project (React is a peer dependency of this package):

```bash
npm install @mani_kan_dan_al/pinotp
```

Usage

Import the component in your React app. The package exports a default `OTPInput` component.

```jsx
import React from "react";
import OTPInput from "@mani_kan_dan_al/pinotp";

export default function Example() {
  const [value, setValue] = React.useState("");
  return <OTPInput length={6} value={value} onChange={setValue} />;
}
```

Build & development

This repo uses Vite for local development. Common commands:

```bash
npm install
npm run dev      # start dev server
npm run build    # build distributable into ./dist
```

Publishing

Before publishing, ensure the `author` and `repository.url` fields in `package.json` are correct. The package is scoped as `@mani_kan_dan_al/pinotp`; to publish publicly run:

```bash
# build and publish (scoped packages are published public with --access public)
npm run build; npm publish --access public
```

Author

Manikandan

Notes

- React and React DOM are declared as peerDependencies — consumers must install them in their projects.
- The package builds ESM and CommonJS bundles into `./dist` and the `prepare`/`prepublishOnly` scripts run the build automatically.

Contributing

PRs are welcome. Open an issue or submit a pull request with suggested improvements.

License

MIT — see the `LICENSE` file.

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

### Minimal Example

```jsx
import React from "react";
import OTPInput from "@mani_kan_dan_al/pinotp";

export default function Example() {
  const [value, setValue] = React.useState("");
  return <OTPInput length={6} value={value} onChange={setValue} />;
}
```

### Full Example with All Main Props

```jsx
import React, { useState } from "react";
import OTPInput from "@mani_kan_dan_al/pinotp";

export default function FullOTPExample() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleChange = (val) => {
    setOtp(val);
    setError(false);
    setCompleted(false);
  };

  const handleComplete = (val) => {
    setCompleted(true);
    // Example: check OTP value
    if (val !== "123456") {
      setError(true);
    } else {
      alert("OTP correct!");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", textAlign: "center" }}>
      <h2>Enter OTP</h2>
      <OTPInput
        length={6}
        value={otp}
        onChange={handleChange}
        onComplete={handleComplete}
        autoFocus={true}
        mask={false}
        shape="box" // box | circle | underline
        size={48}
        gap={10}
        colors={{
          border: "#ccc",
          focus: "#0070f3",
          text: "#222",
          background: "#fff",
          error: "#e00",
        }}
        error={error}
      />
      {error && (
        <div style={{ color: "#e00", marginTop: 8 }}>
          Invalid OTP. Try 123456.
        </div>
      )}
      {completed && !error && (
        <div style={{ color: "#090", marginTop: 8 }}>OTP complete!</div>
      )}
      <button
        style={{ marginTop: 16 }}
        onClick={() => handleComplete(otp)}
        disabled={otp.length !== 6}
      >
        Submit
      </button>
    </div>
  );
}
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

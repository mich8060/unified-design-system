import React, { useState } from "react";
import Input from "./index";

// Simple icon components for demonstration
const ClearIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
        <path d="m13 13-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const EyeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M1 8s2-4 7-4 7 4 7 4-2 4-7 4-7-4-7-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

const CalendarIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 6h10M5 2v4M11 2v4M2 8h12a1 1 0 011 1v6a1 1 0 01-1 1H2a1 1 0 01-1-1V9a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// Example component showcasing Input variants
const InputExamples = () => {
    const [values, setValues] = useState({
        basic: "",
        withIcon: "",
        search: "",
        password: "",
        withPrefix: "",
        withHelper: "",
        withError: ""
    });

    const handleChange = (field) => (e) => {
        setValues(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    return (
        <div style={{ padding: "32px", maxWidth: "800px" }}>
            <h1 style={{ marginBottom: "32px", fontSize: "32px", fontWeight: "700" }}>
                Input Component Examples
            </h1>

            <div style={{ display: "grid", gap: "24px" }}>
                {/* Basic Input */}
                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>
                        Basic Input
                    </h3>
                    <Input
                        label="Name"
                        placeholder="Enter your name"
                        value={values.basic}
                        onChange={handleChange('basic')}
                    />
                </div>

                {/* Input with Icon */}
                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>
                        Input with Clear Icon
                    </h3>
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        value={values.withIcon}
                        onChange={handleChange('withIcon')}
                        trailingIcon={<ClearIcon />}
                        showClearButton
                    />
                </div>

                {/* Search Input */}
                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>
                        Search Input
                    </h3>
                    <Input
                        label="Search"
                        placeholder="Search..."
                        value={values.search}
                        onChange={handleChange('search')}
                        variant="search"
                        leadingIcon={<SearchIcon />}
                    />
                </div>

                {/* Password Input */}
                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>
                        Password Input
                    </h3>
                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        value={values.password}
                        onChange={handleChange('password')}
                        type="password"
                        variant="password"
                        trailingIcon={<EyeIcon />}
                        showPasswordToggle
                    />
                </div>

                {/* Input with Prefix */}
                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>
                        Input with Prefix
                    </h3>
                    <Input
                        label="Website"
                        placeholder="example"
                        value={values.withPrefix}
                        onChange={handleChange('withPrefix')}
                        prefix="https://"
                        suffix=".com"
                    />
                </div>

                {/* Input with Helper Text */}
                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>
                        Input with Helper Text
                    </h3>
                    <Input
                        label="Description"
                        placeholder="Enter a description"
                        value={values.withHelper}
                        onChange={handleChange('withHelper')}
                        helperText="This is helper text to guide the user"
                        maxLength={100}
                        characterCount
                    />
                </div>

                {/* Error State */}
                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>
                        Error State
                    </h3>
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        value={values.withError}
                        onChange={handleChange('withError')}
                        state="error"
                        errorMessage="Please enter a valid email address"
                    />
                </div>

                {/* Disabled State */}
                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>
                        Disabled State
                    </h3>
                    <Input
                        label="Disabled Field"
                        placeholder="This field is disabled"
                        value="Disabled value"
                        state="disabled"
                    />
                </div>

                {/* Dark Theme Example */}
                <div style={{ marginTop: "48px", padding: "32px", backgroundColor: "#000000", borderRadius: "8px" }}>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600", color: "#ffffff" }}>
                        Dark Theme Input
                    </h3>
                    <Input
                        label="Search"
                        placeholder="Search in dark mode..."
                        theme="dark"
                        variant="search"
                        leadingIcon={<SearchIcon />}
                    />
                </div>
            </div>
        </div>
    );
};

export default InputExamples;



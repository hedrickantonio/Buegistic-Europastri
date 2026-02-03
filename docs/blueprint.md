# **App Name**: Bluegistics Load Manager

## Core Features:

- Load Data Input: Capture load data including LOAD ID, MATRICULA, NOMBRE, DNI, and CARRIER NAME via a form.
- Local Storage Persistence: Save the load data as a JSON object in local storage with the key 'bluegistics_form_v1', including 'createdAt' and 'updatedAt' timestamps.
- Form Pre-filling: On page load, if data exists in local storage, pre-fill the form with the saved data and display a 'Last Saved' card below the form.
- DataStore Abstraction: Implement a 'DataStore' layer with a LocalStorageStore and a placeholder FirestoreStore (commented out) for future database integration.
- AuthGate Placeholder: Implement an AuthGate or useAuth() placeholder (without UI) that currently allows all requests but is prepared for future authentication requirements.
- Form Validation and Actions: Implement form validation (all fields required, basic DNI validation), save to local storage, clear form, and delete data functionality.
- Animated Logo: Display an animated Bluegistics logo using anime.js, with the pentagon lines drawing/unifying on load. Provides a placeholder for the SVG paths.

## Style Guidelines:

- Primary color: Deep Blue (#A47E1B) for a corporate and trustworthy feel.
- Background color: Light Grey (#010101), offering a clean and neutral backdrop.
- Accent color: Light Blue (#405867) to highlight key interactive elements without overwhelming the interface.
- Body and headline font: 'Inter', a grotesque-style sans-serif, to provide a modern and objective look.
- Use simple, line-based icons for form labels and actions.
- Center the form on the screen within a card-like container. Use a responsive layout, switching to a single column on mobile.
- Implement a stroke draw animation for the Bluegistics logo using anime.js, triggered on component mount.
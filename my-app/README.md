This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

# Course Management Application

Welcome to the Course Management Application! This web application is designed to provide users with easy access to various courses, including Math, Python, JavaScript, and Web Development. It features a clean and responsive layout, an integrated chatbot for assistance, and an intuitive search functionality.

## Features

- **Course Listings**: Explore various courses with images and descriptions.
- **Search Functionality**: Quickly find courses using the search bar.
- **Chatbot Integration**: Get help and support through an interactive chatbot.
- **Responsive Design**: The application is optimized for both desktop and mobile devices.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Google Generative AI**: To enhance the chatbot experience.

## Setup Instructions

To get started with this project, follow the instructions below:

### Prerequisites

Make sure you have the following installed:

- Node.js (version 12 or later)
- npm or Yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/iremzehragnl/uniai.git
   cd course-management-app
Install the dependencies:


npm install
# or
yarn install
Set up your environment variables:
Create a .env.local file in the root of the project and add your API key:

bash
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
Start the development server:
bash
npm run dev
# or
yarn dev
Open your browser and navigate to http://localhost:3000 to see the application in action.
Usage

Use the search bar at the top to find specific courses.
Click on any course button to explore further.
Interact with the chatbot for assistance or queries.
Contributing

Contributions are welcome! If you have suggestions for improvements or features, feel free to open an issue or submit a pull request.


This template gives a comprehensive overview of your project and provides clear instructions for setup and usage, making it easier for others (or future you) to understand and contribute to the application. Adjust any sections according to your specific needs or preferences!

# Kurslarım Component

The **Kurslarım** component is a part of the Course Management Application that allows users to view and manage their enrolled courses. Users can search for specific courses, continue their learning, or upload notes related to each course.

## Features

- **Course Listings**: Displays a list of courses the user is enrolled in, with details including the instructor's name.
- **Search Functionality**: Users can search for specific courses.
- **Interactive Buttons**: Users can start or continue a course, and upload notes for each course.
- **Responsive Design**: The layout adapts to different screen sizes, ensuring a seamless user experience.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Next.js**: Framework for server-rendered React applications.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Next/Image**: Optimized image component for better performance in Next.js applications.

## Component Structure

The `Kurslarim` component contains the following main elements:

- **Navbar**: A navigation bar that provides links to other parts of the application.
- **Main Section**: 
  - A search input to filter courses.
  - A title and grid layout displaying course cards.
  - Each course card includes:
    - A course image.
    - Course title and instructor information.
    - Buttons for starting the course or uploading notes.
- **Chatbot**: An interactive chatbot component for user support.

## Setup Instructions

To integrate the `Kurslarim` component into your project, follow these instructions:

1. Clone the repository if you haven't already:

   ```bash
   git clone https://github.com/iremzehragnl/uniai.git
   cd course-management-app
Install the necessary dependencies:

npm install
# or
yarn install
Ensure that the Navbar and Chatbot components are available in your project, as this component relies on them.
Place the Kurslarim component in your pages or wherever it is intended to be used:


import Kurslarim from '@/components/kurslarim';
Use the component within your page layout:

export default function SomePage() {
    return (
        <div>
            <Kurslarim />
        </div>
    );
}
Usage

Navigate to the page where the Kurslarim component is rendered.
Use the search bar to find specific courses.
Click on Başla/Devam Et to start or continue a course.
Click on Not Yükle to navigate to the note upload page for the selected course.
Contributing

Contributions to improve this component are welcome! If you find any issues or have suggestions, feel free to open an issue or submit a pull request.

# Not Defterim Component

The **Not Defterim** component is part of the Note Management Application, designed to help users manage their notes effectively. Users can search for notes, view individual notes, and add new notes.

## Features

- **Note Listings**: Displays a grid of notes with details such as the last edited date.
- **Search Functionality**: Users can search for specific notes.
- **Edit Notes**: Users can navigate to a dedicated page to add or edit notes.
- **Responsive Design**: The layout adapts to various screen sizes for an optimal user experience.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A framework for server-rendered React applications.
- **Tailwind CSS**: A utility-first CSS framework for styling components.
- **Next/Image**: An optimized image component provided by Next.js for better performance.

## Component Structure

The `NotDefterim` component includes the following main elements:

- **Navbar**: A navigation bar providing links to different sections of the application.
- **Main Section**:
  - A search input for filtering notes.
  - A title and grid layout displaying note cards.
  - Each note card contains:
    - An image representing the note.
    - Note title and last edited date.
    - A button to add or edit the note, linking to the note upload page.
- **New Note Button**: A prominent button for creating a new note.

## Setup Instructions

To integrate the `NotDefterim` component into your project, follow these steps:

1. Clone the repository if you haven't done so already:

   ```bash
   git clone https://github.com/iremzehragnl/uniai.git
   cd note-management-app
Install the necessary dependencies:

npm install
# or
yarn install
Ensure that the Navbar and Chatbot components are available in your project, as this component depends on them.
Place the NotDefterim component in your pages or wherever you intend to use it:

import NotDefterim from '@/components/not-defterim';
Use the component within your page layout:

export default function SomePage() {
    return (
        <div>
            <NotDefterim />
        </div>
    );
}
Usage

Navigate to the page where the NotDefterim component is rendered.
Use the search bar to find specific notes.
Click on Not Ekle/Düzenle to edit an existing note.
Click on Yeni Not Ekle to navigate to the new note creation page.
Contributing

Contributions to enhance this component are welcome! If you encounter any issues or have suggestions, please open an issue or submit a pull request.

# NotYukle

NotYukle is a web application built with Next.js that allows users to upload images and extract text from them using Google's Generative AI API. Additionally, users can prepare notes on various topics with the help of a chatbot feature.

## Features

- **Image Upload**: Users can upload images (JPEG/PNG) and extract text using Google Generative AI.
- **Text Extraction**: Converts the text present in the uploaded images into a text format and provides additional information about the image.
- **UNIAI Note Preparation**: Users can ask the chatbot for information on a specific topic and have it compiled into notes.
- **Note Download**: Users can download the prepared notes as a text file.
- **User-Friendly Interface**: A simple and intuitive design for seamless interaction.

## Technologies Used

- Next.js
- React
- TypeScript
- Google Generative AI API
- Tailwind CSS (for styling)

## Getting Started

### Prerequisites

Make sure you have the following installed on your local machine:

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd not-yukle
Install the dependencies:

npm install
# or
yarn install
Create a .env.local file in the root of the project and add your API key:

NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
Start the development server:
npm run dev
# or
yarn dev
Open your browser and navigate to http://localhost:3000.
Usage

On the main page, enter a title for your note in the designated input field.
Use the "Resimlerimden Not Çıkar" button to upload an image. The application will extract text from the image and display it.
Use the "UNIAI Not Hazırla" button to open the chatbot. Enter a subject for which you want to prepare notes.
Once the chatbot provides a response, you can add it to your notes or ask additional questions.
Finally, you can download your notes by clicking the "Notları İndir" button.
Contributing

If you would like to contribute to NotYukle, please fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

# NotYukle - Digitize Your Lecture Notes

NotYukle is an application that allows users to upload photos of lecture notes and convert them into digital text using AI. Users can retrieve the text from their uploaded images and easily download it as a file.

## Features

- **Image Upload:** Supports JPEG and PNG file formats.
- **AI Conversion:** Automatically converts text in uploaded photos to digital text using Google’s Gemini model.
- **Text Preview:** The converted text is displayed in a text area for review.
- **File Download:** The transcribed text can be downloaded as a text file.
- **User-Friendly Interface:** Provides a simple and interactive interface for enhanced user experience.

## Installation

### Requirements

- Node.js (v14 or above)
- Next.js (v12 or above)
- React (v17 or above)

### Getting Started

1. Clone the project:

    ```bash
    git clone https://github.com/iremzehragnl/uniai.git
    cd not-yukle
    ```

2. Install the necessary packages:

    ```bash
    npm install
    ```

3. Create a `.env.local` file and add the `NEXT_PUBLIC_GEMINI_API_KEY` variable with your API key:

    ```bash
    NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Open the app and click the "Choose File" button to upload a photo of your lecture notes.
2. Click the "Digitize Notes" button. The content of your uploaded image will be transcribed to text using AI.
3. Review the converted text and click the "Download Notes" button to save it as a file.

## Contributing

If you would like to contribute, please open a pull request or report any issues.

## License

This project is licensed under the MIT License.

## Acknowledgments

Special thanks to the Next.js and React communities for their continued support and development.
Thank you for using this component in your application!

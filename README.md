[中文版本](README.zh.md)

# Project Overview

This project is a modern web application built using React and Ant Design. It features a responsive design, dynamic theming, and a rich set of components for displaying and interacting with content. Below are the key highlights and components of the project:

## Directory Structure

# Project Structure

This document provides an overview of the project's directory structure and a brief description of each component.

## Key Features

1. **Responsive Design**: The application is designed to be fully responsive, adapting to different screen sizes using media queries and flexible layouts.

2. **Dynamic Theming**: Users can switch between different themes, such as "Black Rose", "Blue Sky", and "Green Grassland", which change the application's appearance dynamically.

3. **Lazy Loading**: Components such as `Home`, `Article`, `Footer`, and `FriendLink` are lazy-loaded to improve performance and reduce initial load time.

4. **Smooth Scrolling**: The application implements smooth scrolling for a better user experience.

5. **Markdown Support**: The application supports rendering Markdown content with syntax highlighting, emoji support, and additional plugins for enhanced functionality.

6. **Interactive Components**: Features like a "Lucky Box" for fortune-telling and a "Title Tips" section that fetches and displays a random poem.

7. **Comment System**: Users can add comments and replies, with a form that validates input and stores user information locally.

8. **Infinite Scrolling**: The article list supports infinite scrolling, loading more content as the user scrolls down.

## Components

- **App**: The main entry point of the application, setting up routes and theme context.
- **Nav**: A navigation bar that adapts to screen size, providing links to different sections of the application.
- **Footer**: A simple footer component with a message.
- **MarkdownToc**: A table of contents for Markdown documents, supporting up to four levels of headings.
- **ArticleList**: Displays a list of articles with tags, likes, and comments.
- **CommentForm**: A form for submitting comments, with validation and local storage of user data.
- **SideBar**: Contains additional information and interactive elements like the "Lucky Box".
- **TitleTips**: Displays a random poem using the Jinrishici API.
- **MdViewer**: Renders Markdown content with various plugins for enhanced display.

## Styling

The project uses SCSS for styling, with a focus on modular and reusable styles. Global styles are defined in `root.scss`, and component-specific styles are organized in their respective directories.

## Setup and Usage

To set up the project locally, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install` or `yarn`.
3. Start the development server with `npm start` or `yarn start`.
4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Future Improvements

- **Accessibility Enhancements**: Improve accessibility features for better usability.
- **Performance Optimization**: Further optimize component rendering and data fetching.
- **Additional Themes**: Add more themes for greater customization options.

This README provides a comprehensive overview of the project's structure and features, making it easier for new developers to get started and understand the application's capabilities.

.
├── README.md                  # English documentation
├── README.zh.md               # 中文文档
├── src                        # Source code directory
│   ├── App.scss               # Main SCSS file for styling
│   ├── App.tsx                # Main application component
│   ├── components             # Reusable components
│   │   ├── MarkdownToc        # Markdown Table of Contents component
│   │   │   ├── index.scss     # Styles for MarkdownToc
│   │   │   └── index.tsx      # Component logic for MarkdownToc
│   │   ├── article-list       # Article list component
│   │   │   ├── article-list.module.scss # Styles for article list
│   │   │   └── index.tsx      # Component logic for article list
│   │   ├── commentForm        # Comment form component
│   │   │   └── index.tsx      # Component logic for comment form
│   │   ├── commentList        # Comment list component
│   │   │   └── index.tsx      # Component logic for comment list
│   │   ├── footer             # Footer component
│   │   │   ├── footer.module.scss # Styles for footer
│   │   │   └── index.tsx      # Component logic for footer
│   │   ├── full-loading       # Full page loading spinner
│   │   │   ├── full-loading.module.scss # Styles for loading spinner
│   │   │   └── index.tsx      # Component logic for loading spinner
│   │   ├── layout             # Layout component
│   │   │   └── index.tsx      # Component logic for layout
│   │   ├── md-view            # Markdown viewer component
│   │   │   ├── md-view.module.scss # Styles for markdown viewer
│   │   │   └── index.tsx      # Component logic for markdown viewer
│   │   ├── nav                # Navigation bar component
│   │   │   ├── nav.module.scss # Styles for navigation bar
│   │   │   └── index.tsx      # Component logic for navigation bar
│   │   ├── side-bar           # Sidebar component
│   │   │   ├── side-bar.module.scss # Styles for sidebar
│   │   │   └── index.tsx      # Component logic for sidebar
│   │   └── title-tips         # Title tips component
│   │       ├── title-tips.module.scss # Styles for title tips
│   │       └── index.tsx      # Component logic for title tips
│   ├── hooks                  # Custom hooks
│   │   └── useReplyModal      # Hook for reply modal
│   │       └── index.tsx      # Logic for reply modal hook
│   ├── http                   # HTTP request logic
│   │   └── http.ts            # HTTP service configuration
│   ├── page                   # Page components
│   │   └── photo.tsx          # Photo page component
│   └── static                 # Static resources
│       └── style              # Global styles
│           └── root.scss      # Root SCSS variables and styles
└── tsconfig.json              # TypeScript configuration
.

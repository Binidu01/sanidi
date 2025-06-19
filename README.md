<div align="center">
  
# 💖 Sanidi
**Professional love message generator created for Sanidi** ✨  
*Generate personalized romantic messages with customizable templates and analytics*

![JavaScript](https://img.shields.io/badge/JavaScript-f1e05a?style=for-the-badge&logo=javascript&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-cb3837?style=for-the-badge&logo=npm&logoColor=white)
[![Stars](https://img.shields.io/github/stars/Binidu01/sanidi?style=for-the-badge&logo=github)](https://github.com/Binidu01/sanidi/stargazers)
[![Downloads](https://img.shields.io/npm/dt/sanidi?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/sanidi)
[![License](https://img.shields.io/github/license/Binidu01/sanidi?style=for-the-badge)](https://github.com/Binidu01/sanidi/blob/main/LICENSE)

</div>

---

## 📋 Table of Contents
- [💝 About](#-about)
- [🚀 Features](#-features)
- [🛠️ Installation](#️-installation)
- [💻 Usage](#-usage)
- [🎨 Examples](#-examples)
- [⚙️ API Reference](#️-api-reference)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📞 Contact](#-contact)

---

## 💝 About

**Sanidi** is a professional-grade love message generator that creates personalized romantic messages with enterprise-level features. Originally created as a heartfelt tribute to Sanidi, this library helps developers add romance to their applications with customizable templates, smart word selection, and analytics tracking.

Perfect for dating apps, social media platforms, greeting card companies, chatbots, and any application that needs personalized romantic content at scale.

## 🚀 Features

- 💕 **Smart Template System** - Contextually appropriate word selection based on mood and intensity
- 🎯 **Multi-Category Support** - Classic, passionate, poetic, emotional, and devoted message styles
- 📊 **Built-in Analytics** - Track usage patterns, popular templates, and word frequency
- 🚀 **Performance Optimized** - Intelligent caching system with configurable cache size
- 🌍 **Universal Name Support** - Works with any name from any culture or language
- 🎨 **Customizable Emotions** - Control intensity, sentiment, and emoji styles
- 📦 **Batch Generation** - Create multiple unique messages at once
- 🔧 **Enterprise Ready** - Professional error handling, validation, and documentation

## 🛠️ Installation

### NPM
```bash
npm install sanidi
```

### Yarn
```bash
yarn add sanidi
```

### Prerequisites
- Node.js (v12 or higher)
- npm or yarn

## 💻 Usage

### Basic Usage (Quick Start)
```javascript
const sanidi = require('sanidi');

// Generate a simple love message
const message = sanidi.generateLoveString('Sanidi');
console.log(message);
// Output: "Hey Sanidi, You are my beautiful star, and I can't imagine life without you. 💖"
```

### Professional Usage
```javascript
const { LoveMessageGenerator } = require('sanidi');

// Create generator with analytics and caching
const generator = new LoveMessageGenerator({
  enableAnalytics: true,
  enableCache: true,
  maxCacheSize: 100
});

// Generate customized message
const message = generator.generateMessage({
  name: 'Sanidi',
  category: 'passionate',
  intensity: 'high',
  style: 'passionate',
  sentiment: 'eternal',
  emojiStyle: 'romantic'
});

console.log(message);
// Output: "Hey Sanidi, My heart races only for you, until the end of time. 🔥"
```

## 🎨 Examples

### Different Categories
```javascript
// Classic romantic
generator.generateMessage({ 
  name: 'Sarah', 
  category: 'classic' 
});

// Passionate love
generator.generateMessage({ 
  name: 'Michael', 
  category: 'passionate', 
  intensity: 'high' 
});

// Poetic expression
generator.generateMessage({ 
  name: 'Emma', 
  category: 'poetic',
  style: 'dreamy'
});
```

### Batch Generation
```javascript
// Generate 5 unique messages
const messages = generator.generateBatch(5, {
  name: 'Alex',
  category: 'romantic',
  intensity: 'medium'
});

messages.forEach(msg => console.log(msg));
```

### Analytics
```javascript
// Get usage statistics
const stats = generator.getAnalytics();
console.log('Total generated:', stats.totalGenerated);
console.log('Most used templates:', stats.mostUsedTemplates);
console.log('Popular words:', stats.popularWords);
```

## ⚙️ API Reference

### `sanidi.generateLoveString(name)`
Simple method for backward compatibility.
- **name** (string): Recipient's name
- **Returns**: Generated love message string

### `new LoveMessageGenerator(config)`
Creates a new generator instance with configuration options.

**Config Options:**
- `enableCache` (boolean): Enable message caching (default: true)
- `maxCacheSize` (number): Maximum cache size (default: 100)
- `enableAnalytics` (boolean): Enable usage analytics (default: false)

### `generateMessage(options)`
Generate a customized love message.

**Options:**
- `name` (string): Recipient's name (default: "Love")
- `category` (string): Message category - "classic", "passionate", "poetic", "emotional", "devoted"
- `intensity` (string): Message intensity - "low", "medium", "high"
- `style` (string): Word selection style - "gentle", "passionate", "dreamy", "classic", "intense", "tender"
- `sentiment` (string): Ending sentiment - "eternal", "present", "future"
- `emojiStyle` (string): Emoji category - "romantic", "passionate", "sweet"
- `includeEmoji` (boolean): Include emoji in message (default: true)

### `generateBatch(count, options)`
Generate multiple unique messages.
- **count** (number): Number of messages to generate
- **options** (object): Same as generateMessage options

### `getAnalytics()`
Returns analytics data (requires `enableAnalytics: true`).

### `getAvailableOptions()`
Returns all available configuration options.

## 🏗️ Built With

- **JavaScript (ES6+)** - 100%
- **Node.js** - Runtime environment
- **NPM** - Package management

## 🤝 Contributing

Contributions make the open source community amazing! Any contributions are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Ideas for Contributions
- Add more language support
- Create new message templates
- Improve word selection algorithms
- Add seasonal/holiday themes
- Enhance analytics features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Binidu Ranasinghe** - rbinidu@gmail.com

- GitHub: [@Binidu01](https://github.com/Binidu01)
- Project Link: [https://github.com/Binidu01/sanidi](https://github.com/Binidu01/sanidi)
- NPM Package: [https://www.npmjs.com/package/sanidi](https://www.npmjs.com/package/sanidi)

---

<div align="center">
  
**[⬆ Back to Top](#-sanidi)**

*Made with ❤️ for Sanidi by [Binidu Ranasinghe](https://github.com/Binidu01)*

⭐ **Star this repo if it helps you spread love!** ⭐

*"Code is poetry, but love messages are pure magic"* ✨

</div>

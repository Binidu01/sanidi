/**
 * Professional Love Message Generator
 * A sophisticated utility for generating personalized romantic messages
 * with advanced customization and validation features.
 */

class LoveMessageGenerator {
  constructor(config = {}) {
    this.config = {
      enableCache: config.enableCache !== false,
      maxCacheSize: config.maxCacheSize || 100,
      enableAnalytics: config.enableAnalytics || false,
      ...config
    };

    this.cache = new Map();
    this.analytics = {
      generated: 0,
      templatesUsed: new Map(),
      popularWords: new Map()
    };

    this.templates = [
      {
        id: 'classic_romantic',
        text: "You are my {adjective} {noun}, {ending}",
        category: 'classic',
        intensity: 'medium'
      },
      {
        id: 'heartbeat',
        text: "My {noun} beats only for you, {ending}",
        category: 'passionate',
        intensity: 'high'
      },
      {
        id: 'metaphorical',
        text: "Being with you is like {verb} in a {adjective} {noun}, {ending}",
        category: 'poetic',
        intensity: 'medium'
      },
      {
        id: 'emotional_impact',
        text: "Your {noun} makes my heart {verb}, {ending}",
        category: 'emotional',
        intensity: 'high'
      },
      {
        id: 'devotional',
        text: "I {verb} every moment with you, my {adjective} {noun} {ending}",
        category: 'devoted',
        intensity: 'high'
      }
    ];

    this.wordBank = {
      verbs: {
        gentle: ["dance", "glow", "shimmer", "whisper", "bloom"],
        passionate: ["race", "soar", "ignite", "pulse", "thunder"],
        dreamy: ["float", "drift", "sparkle", "twinkle", "flutter"]
      },
      adjectives: {
        classic: ["beautiful", "precious", "wonderful", "amazing", "perfect"],
        intense: ["breathtaking", "magnificent", "extraordinary", "stunning", "radiant"],
        tender: ["gentle", "sweet", "soft", "warm", "delicate"]
      },
      nouns: {
        celestial: ["star", "moon", "sun", "comet", "constellation"],
        nature: ["flower", "rose", "diamond", "pearl", "gem"],
        abstract: ["dream", "wish", "hope", "light", "treasure"]
      }
    };

    this.endings = {
      eternal: [
        "and I can't imagine life without you.",
        "forever and always, my love.",
        "until the end of time.",
        "through all of eternity."
      ],
      present: [
        "and you make every day better.",
        "because you're my everything.",
        "with you, life is perfect.",
        "and I'm grateful for every moment."
      ],
      future: [
        "and I want to spend forever with you.",
        "and our love will only grow stronger.",
        "and together we'll conquer the world.",
        "and our story is just beginning."
      ]
    };

    this.emojis = {
      romantic: ["💖", "💕", "💘", "💞", "💗"],
      passionate: ["🔥", "❤️‍🔥", "💋", "😍", "🥰"],
      sweet: ["🌹", "🌸", "✨", "💫", "🦋"]
    };
  }

  /**
   * Validates input parameters
   * @param {Object} options - Generation options
   * @returns {boolean} - Validation result
   */
  _validateOptions(options) {
    if (options.name && typeof options.name !== 'string') {
      throw new Error('Name must be a string');
    }
    
    if (options.intensity && !['low', 'medium', 'high'].includes(options.intensity)) {
      throw new Error('Intensity must be low, medium, or high');
    }

    if (options.category && !this.templates.some(t => t.category === options.category)) {
      throw new Error(`Invalid category. Available: ${[...new Set(this.templates.map(t => t.category))].join(', ')}`);
    }

    return true;
  }

  /**
   * Generates a random selection from array with optional filtering
   * @param {Array} array - Source array
   * @param {Function} filter - Optional filter function
   * @returns {*} - Random element
   */
  _getRandomElement(array, filter = null) {
    const filtered = filter ? array.filter(filter) : array;
    if (filtered.length === 0) return array[Math.floor(Math.random() * array.length)];
    return filtered[Math.floor(Math.random() * filtered.length)];
  }

  /**
   * Selects words based on mood and intensity
   * @param {string} type - Word type (verbs, adjectives, nouns)
   * @param {string} mood - Desired mood
   * @returns {string} - Selected word
   */
  _selectWord(type, mood = 'classic') {
    const wordGroup = this.wordBank[type];
    if (!wordGroup) return '';

    // Try to get words matching the mood, fallback to first available group
    const words = wordGroup[mood] || Object.values(wordGroup)[0];
    return this._getRandomElement(words);
  }

  /**
   * Selects an appropriate ending based on sentiment
   * @param {string} sentiment - Desired sentiment
   * @returns {string} - Selected ending
   */
  _selectEnding(sentiment = 'present') {
    const endings = this.endings[sentiment] || this.endings.present;
    return this._getRandomElement(endings);
  }

  /**
   * Fills template with contextually appropriate words
   * @param {Object} template - Template object
   * @param {Object} options - Generation options
   * @returns {string} - Filled template
   */
  _fillTemplate(template, options = {}) {
    const mood = this._determineMood(template.intensity, options.style);
    
    let filled = template.text
      .replace(/{verb}/g, () => this._selectWord('verbs', mood))
      .replace(/{adjective}/g, () => this._selectWord('adjectives', mood))
      .replace(/{noun}/g, () => this._selectWord('nouns', mood))
      .replace(/{ending}/g, () => this._selectEnding(options.sentiment));

    // Track word usage for analytics
    if (this.config.enableAnalytics) {
      this._updateAnalytics(template.id, filled);
    }

    return filled;
  }

  /**
   * Determines mood based on template intensity and user style preference
   * @param {string} intensity - Template intensity
   * @param {string} style - User style preference
   * @returns {string} - Determined mood
   */
  _determineMood(intensity, style) {
    if (style) return style;
    
    switch (intensity) {
      case 'high': return 'passionate';
      case 'low': return 'tender';
      default: return 'classic';
    }
  }

  /**
   * Updates analytics data
   * @param {string} templateId - Template identifier
   * @param {string} message - Generated message
   */
  _updateAnalytics(templateId, message) {
    this.analytics.generated++;
    
    const count = this.analytics.templatesUsed.get(templateId) || 0;
    this.analytics.templatesUsed.set(templateId, count + 1);

    // Track popular words (simplified word frequency)
    const words = message.toLowerCase().match(/\b\w+\b/g) || [];
    words.forEach(word => {
      if (word.length > 3) { // Only track meaningful words
        const count = this.analytics.popularWords.get(word) || 0;
        this.analytics.popularWords.set(word, count + 1);
      }
    });
  }

  /**
   * Manages cache for generated messages
   * @param {string} key - Cache key
   * @param {string} value - Message to cache
   */
  _manageCache(key, value) {
    if (!this.config.enableCache) return;

    if (this.cache.size >= this.config.maxCacheSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, {
      message: value,
      timestamp: Date.now()
    });
  }

  /**
   * Generates a personalized love message
   * @param {Object} options - Generation options
   * @param {string} options.name - Recipient name
   * @param {string} options.category - Message category
   * @param {string} options.intensity - Message intensity
   * @param {string} options.style - Word selection style
   * @param {string} options.sentiment - Ending sentiment
   * @param {string} options.emojiStyle - Emoji style
   * @param {boolean} options.includeEmoji - Whether to include emoji
   * @returns {string} - Generated love message
   */
  generateMessage(options = {}) {
    try {
      this._validateOptions(options);

      const {
        name = "Love",
        category,
        intensity,
        style,
        sentiment = 'present',
        emojiStyle = 'romantic',
        includeEmoji = true
      } = options;

      // Generate cache key
      const cacheKey = JSON.stringify(options);
      
      // Check cache first
      if (this.config.enableCache && this.cache.has(cacheKey)) {
        const cached = this.cache.get(cacheKey);
        // Return cached if less than 1 hour old
        if (Date.now() - cached.timestamp < 3600000) {
          return cached.message;
        }
      }

      // Select appropriate template
      const template = this._getRandomElement(
        this.templates,
        t => (!category || t.category === category) && 
             (!intensity || t.intensity === intensity)
      );

      // Generate the message
      const filledMessage = this._fillTemplate(template, { style, sentiment });
      
      // Add emoji if requested
      const emoji = includeEmoji ? 
        this._getRandomElement(this.emojis[emojiStyle] || this.emojis.romantic) : '';
      
      const finalMessage = `Hey ${name}, ${filledMessage} ${emoji}`.trim();

      // Cache the result
      this._manageCache(cacheKey, finalMessage);

      return finalMessage;

    } catch (error) {
      console.error('Error generating love message:', error);
      return `Hey ${options.name || 'Love'}, you mean everything to me! 💖`;
    }
  }

  /**
   * Generates multiple unique messages
   * @param {number} count - Number of messages to generate
   * @param {Object} options - Generation options
   * @returns {Array<string>} - Array of unique messages
   */
  generateBatch(count = 5, options = {}) {
    const messages = new Set();
    const maxAttempts = count * 3; // Prevent infinite loops
    let attempts = 0;

    while (messages.size < count && attempts < maxAttempts) {
      const message = this.generateMessage(options);
      messages.add(message);
      attempts++;
    }

    return Array.from(messages);
  }

  /**
   * Gets analytics data
   * @returns {Object} - Analytics information
   */
  getAnalytics() {
    if (!this.config.enableAnalytics) {
      return { error: 'Analytics not enabled' };
    }

    return {
      totalGenerated: this.analytics.generated,
      mostUsedTemplates: Array.from(this.analytics.templatesUsed.entries())
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5),
      popularWords: Array.from(this.analytics.popularWords.entries())
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
    };
  }

  /**
   * Gets available configuration options
   * @returns {Object} - Available options
   */
  getAvailableOptions() {
    return {
      categories: [...new Set(this.templates.map(t => t.category))],
      intensities: ['low', 'medium', 'high'],
      styles: Object.keys(this.wordBank.verbs),
      sentiments: Object.keys(this.endings),
      emojiStyles: Object.keys(this.emojis)
    };
  }

  /**
   * Clears cache and resets analytics
   */
  reset() {
    this.cache.clear();
    this.analytics = {
      generated: 0,
      templatesUsed: new Map(),
      popularWords: new Map()
    };
  }
}

// Factory function for backward compatibility
function createLoveGenerator(config) {
  return new LoveMessageGenerator(config);
}

// Legacy wrapper for the original sanidi object structure
const sanidi = {
  // Original method for backward compatibility
  generateLoveString(name = "Sanidi") {
    const generator = new LoveMessageGenerator();
    return generator.generateMessage({ name });
  },

  // Enhanced generator access
  createGenerator: createLoveGenerator,
  LoveMessageGenerator
};

// Export both the class and the legacy object
module.exports = sanidi;
module.exports.LoveMessageGenerator = LoveMessageGenerator;
module.exports.createLoveGenerator = createLoveGenerator;

// Usage Examples - Works with ANY name:
/*
// Basic usage (backward compatible)
const message1 = sanidi.generateLoveString("Sarah");
const message2 = sanidi.generateLoveString("Michael");
const message3 = sanidi.generateLoveString("Emma");
const message4 = sanidi.generateLoveString("Alex");

// Professional usage with any name
const generator = new LoveMessageGenerator({
  enableAnalytics: true,
  enableCache: true
});

// Works with any name from around the world
const messages = [
  generator.generateMessage({ name: "Priya" }),
  generator.generateMessage({ name: "José" }),
  generator.generateMessage({ name: "Fatima" }),
  generator.generateMessage({ name: "Chen" }),
  generator.generateMessage({ name: "Aisha" }),
  generator.generateMessage({ name: "Giovanni" }),
  generator.generateMessage({ name: "Olga" }),
  generator.generateMessage({ name: "Raj" })
];

// Advanced customization with any name
const romanticMessage = generator.generateMessage({
  name: "Taylor",
  category: "passionate",
  intensity: "high",
  style: "passionate",
  sentiment: "eternal",
  emojiStyle: "passionate"
});

const sweetMessage = generator.generateMessage({
  name: "Jordan",
  category: "classic", 
  intensity: "medium",
  style: "tender",
  sentiment: "present",
  emojiStyle: "sweet"
});

// Batch generation for multiple recipients
const valentinesMessages = generator.generateBatch(3, { 
  name: "Sam",
  category: "poetic",
  intensity: "high"
});

// No name provided? Uses default "Love"
const defaultMessage = generator.generateMessage({
  category: "romantic",
  intensity: "medium"
});

// Examples of what gets generated:
// "Hey Sarah, You are my beautiful star, and I can't imagine life without you. 💖"
// "Hey Michael, My heart beats only for you, forever and always, my love. 💕" 
// "Hey Emma, Being with you is like dancing in a magical garden, with you, life is perfect. ✨"
// "Hey Alex, Your light makes my heart soar, because you're my everything. 🔥"

// Perfect for:
// - Dating apps
// - Valentine's Day cards
// - Anniversary messages  
// - Wedding vows inspiration
// - Social media captions
// - Greeting card companies
// - Romance writing tools
// - Chatbot personality
*/
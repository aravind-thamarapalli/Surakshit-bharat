/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {'student' | 'teacher' | 'admin'} role
 * @property {string} [avatar]
 */

/**
 * @typedef {Object} LearningModule
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {string} imageUrl
 * @property {string} duration
 * @property {'Beginner' | 'Intermediate' | 'Advanced'} difficulty
 * @property {boolean} featured
 * @property {number} completionRate
 */

/**
 * @typedef {Object} StudentProgress
 * @property {string} studentId
 * @property {string} moduleId
 * @property {number} completionPercentage
 * @property {Date} lastAccessed
 */

/**
 * @typedef {Object} Drill
 * @property {string} id
 * @property {string} title
 * @property {string} type
 * @property {Date} date
 * @property {string} location
 * @property {'Scheduled' | 'Completed' | 'Cancelled'} status
 */

/**
 * @typedef {Object} ActivityLog
 * @property {string} id
 * @property {string} type
 * @property {string} description
 * @property {string} user
 * @property {Date} timestamp
 * @property {'Success' | 'Pending' | 'Failed'} status
 */
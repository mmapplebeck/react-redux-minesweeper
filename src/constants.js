export const STATUS = {
  NEUTRAL: 'NEUTRAL',
  CLEARED: 'CLEARED',
  FAILED: 'FAILED',
  DANGER: 'DANGER'
}

export const DEFAULT_SETTINGS = {
  BEGINNER: {
    id: 'beginner',
    mineCount: 10,
    rowCount: 8,
    colCount: 8
  },
  INTERMEDIATE: {
    id: 'intermediate',
    mineCount: 40,
    rowCount: 16,
    colCount: 16
  },
  EXPERT: {
    id: 'expert',
    mineCount: 99,
    rowCount: 24,
    colCount: 24
  }
}
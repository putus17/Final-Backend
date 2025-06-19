export enum UserRole {
  SUPER_ADMIN = "super_admin",
  DZONGKHAG_ADMIN = "dzongkhag_admin",
  GEWOG_OPERATOR = "gewog_operator",
  METER_READER = "meter_reader",
  TECHNICIAN = "technician",
  QUALITY_INSPECTOR = "quality_inspector",
  FINANCIAL_OFFICER = "financial_officer",
  VIEWER = "viewer",
  CONSUMER = "consumer"
}

export enum RegionType {
  Western = 'Western',
  Central = 'Central',
  Eastern = 'Eastern',
  South= 'Southern'
}

export const WATER_SOURCE_TYPES = [
  'River',
  'Stream',
  'Lake',
  'Spring',
  'Glacier_Fed',
  'Groundwater',
  'Reservoir'
];

export const WATER_SOURCE_STATUS = [
  'Active',
  'Seasonal',
  'Depleted',
  'Contaminated',
  'Under_Maintenance'
];
export const Region = {
  EAST: 'East',
  WEST: 'West',
  CENTRAL: 'Central',
  SOUTH: 'South',
} 


"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Region = exports.WATER_SOURCE_STATUS = exports.WATER_SOURCE_TYPES = exports.RegionType = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["SUPER_ADMIN"] = "super_admin";
    UserRole["DZONGKHAG_ADMIN"] = "dzongkhag_admin";
    UserRole["GEWOG_OPERATOR"] = "gewog_operator";
    UserRole["METER_READER"] = "meter_reader";
    UserRole["TECHNICIAN"] = "technician";
    UserRole["QUALITY_INSPECTOR"] = "quality_inspector";
    UserRole["FINANCIAL_OFFICER"] = "financial_officer";
    UserRole["VIEWER"] = "viewer";
    UserRole["CONSUMER"] = "consumer";
})(UserRole || (exports.UserRole = UserRole = {}));
var RegionType;
(function (RegionType) {
    RegionType["Western"] = "Western";
    RegionType["Central"] = "Central";
    RegionType["Eastern"] = "Eastern";
    RegionType["South"] = "Southern";
})(RegionType || (exports.RegionType = RegionType = {}));
exports.WATER_SOURCE_TYPES = [
    'River',
    'Stream',
    'Lake',
    'Spring',
    'Glacier_Fed',
    'Groundwater',
    'Reservoir'
];
exports.WATER_SOURCE_STATUS = [
    'Active',
    'Seasonal',
    'Depleted',
    'Contaminated',
    'Under_Maintenance'
];
exports.Region = {
    EAST: 'East',
    WEST: 'West',
    CENTRAL: 'Central',
    SOUTH: 'South',
};

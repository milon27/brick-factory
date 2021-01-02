const db = require('./config');
class DbController {
    constructor() {
        this.Instance;
    }
    static getInstance = () => {
        if (this.Instance == null)
            return new DbController();
        else
            return this.Instance;
    }
    //create db
    createDb = async (title, callback) => {
        //let sql = `CREATE DATABASE ${title};`;
        let sql = `CREATE DATABASE IF NOT EXISTS ${title};`;
        db.query(sql, callback);
    }

    //user table
    //ROLE -- ADMIN,MANAGER,STUFF
    createUserTable = async (callback) => {
        let sql = `CREATE TABLE user_table(
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            user_name varchar(200),
            user_email varchar(200) UNIQUE,
            user_phone_num varchar(200) UNIQUE,
            user_password varchar(200),
            user_role varchar(100),
            user_salary double,
            user_join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`;
        db.query(sql, callback);
    }
    //season list table
    createSeasonsTable = async (callback) => {
        let sql = `CREATE TABLE seasons_table(
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title varchar(200),
            active tinyint(1),
            start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            end TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`;
        db.query(sql, callback);
    }

    //create table//coal cost/--due_amount double ,
    createCoalCostTable = async (callback) => {
        let sql = `CREATE TABLE coal_cost_table(
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            season_id INT NOT NULL,
            cost_title varchar(200) DEFAULT "COAL_COST",
            total_amount double,
            total_coal_weight double,
            paid_amount double,
            transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            coal_dealer_name varchar(200),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            created_by_uid INT,
            updated_by_uid INT
            );`;
        db.query(sql, callback);
    }
    //create soil cost table
    createSoilCostTable = async (callback) => {
        let sql = `CREATE TABLE soil_cost_table(
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            season_id INT NOT NULL,
            cost_title varchar(200) DEFAULT "SOIL_COST",
            soil_car_quantity double,
            soil_per_car_price double,
            total_amount double,
            paid_amount double,
            transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            contractor_name varchar(200),

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            created_by_uid INT,
            updated_by_uid INT
        );`;
        db.query(sql, callback);
    }
    //create table tax cost
    createTaxCostTable = async (callback) => {
        let sql = `CREATE TABLE tax_cost_table(
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            season_id INT NOT NULL,
            cost_title varchar(200) DEFAULT "TAX_COST",
            tax_title varchar(200),
            
            total_amount double,
            paid_amount double,

            transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            created_by_uid INT,
            updated_by_uid INT
        );`;
        db.query(sql, callback);
    }
    //create table daily other cost
    createDailyOtherCostTable = async (callback) => {
        let sql = `CREATE TABLE daily_other_cost_table(
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            season_id INT NOT NULL,
            cost_title varchar(200) DEFAULT "DAILY_OTHER_COST",
            other_cost_title varchar(200),
            other_cost_details varchar(200),

            total_amount double,
            transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            created_by_uid INT,
            updated_by_uid INT
        );`;
        db.query(sql, callback);
    }
    /**
     * @description landlord cost information
     * @relation {Landlord+property}  
     */
    //create table landlord list
    createLandLordListTable = async (callback) => {
        let sql = `CREATE TABLE land_loard_list_table(
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            land_lord_name varchar(200),
            land_quantity varchar(200),
            land_rent_per_year double,
            
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            created_by_uid INT,
            updated_by_uid INT
        );`;
        db.query(sql, callback);
    }
    //create table landlord cost
    createLandLordCostTable = async (callback) => {
        let sql = `CREATE TABLE land_loard_cost_table(
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            cost_title varchar(200) DEFAULT "LAND_LOARD_COST",
            land_lord_id INT,

            paid_amount double,
            transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            created_by_uid INT,
            updated_by_uid INT
        );`;
        db.query(sql, callback);
    }

    //staff list talbe
    createStaffListTable = async (callback) => {
        let sql = `CREATE TABLE staff_list_table(
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            staff_name varchar(200),
            staff_position varchar(200),
            staff_salary double,
            staff_join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            created_by_uid INT,
            updated_by_uid INT
        );`;
        db.query(sql, callback);
    }
    createStaffSalaryTable = async (callback) => {
        let sql = `CREATE TABLE staff_salary_table(
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            cost_title varchar(200) DEFAULT "STAFF_SALARY_COST",
            staff_id INT,

            paid_amount double,
            transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            created_by_uid INT,
            updated_by_uid INT
        );`;
        db.query(sql, callback);
    }

    // daily labour cost info

    createLabourDailySalaryTable = async (callback) => {
        let sql = `CREATE TABLE labour_daily_salary_table(
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            season_id INT NOT NULL,
            cost_title varchar(200) DEFAULT "LABOUR_DAILY_SALARY_COST",
            labour_name varchar(200),
            labour_daily_salary double,

            paid_amount double,
            transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            created_by_uid INT,
            updated_by_uid INT
        );`;
        db.query(sql, callback);
    }

    /**mil(early_paid_amount ( shorder anar jonno ei tk dea ante hobe)==
       early_payment_paid ( early_paid_amount er takhe kete newa hobe )=== 0tk)

     *shorder_type= MIL_TYPE:KACHA_TYPE:PAKA_TYPE:JAB_TYPE:
     */
    createShorderTable = async (callback) => {
        const sql = `CREATE TABLE shorder_info_table(
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            season_id INT NOT NULL,
            shorder_name varchar(100),
            shorder_type varchar(100),
            early_paid_amount double,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            created_by_uid INT,
            updated_by_uid INT
        );`;
        db.query(sql, callback);
    }

    // weekly_bill_due double,(cost_type= mil one,two,three,four,five)
    //weekly_early_bill_paid= j taka kaita nibo advance/early takhe.
    createBrickBuiltCostTable = async (callback) => {
        const sql = `CREATE TABLE brick_built_cost_table(
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            season_id INT NOT NULL,
            cost_type varchar(200),

            shorder_id int,
            weekly_brick_quantity double,
            weekly_bill double,
            weekly_cash_bill_paid double,
            weekly_early_bill_paid double,

            transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            created_by_uid INT,
            updated_by_uid INT
        );`;
        db.query(sql, callback);
    }
    //kaca,paka,jab

}

module.exports = DbController;
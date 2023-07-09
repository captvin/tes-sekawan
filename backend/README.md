Node version = 14.0.1
Database = MySQL


Login Data{
    admin{
        username : adhe
        password : adhe
    }
    official{
        username: devin
        password: devin
    }
    superadmin{
        username: alvin
        password: alvin
    }
}

role permition{
    superadmin : can manage all services
    admin : {
        can read pemesanan, driver, tambang, unit, pegawai(with the same ID ad their own ID);
        can create pemesanan;
        can update pemesanan, unit, pegawai(with the same ID ad their own ID)
    }
    official : {
        can read pemesanan, unit, pegawai(with the same ID ad their own ID);
        can update pemesanan, unit, pegawai (with the same ID ad their own ID)
    }

}
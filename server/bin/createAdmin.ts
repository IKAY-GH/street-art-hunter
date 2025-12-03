import "dotenv/config";
import argon2 from "argon2";
import database from "../database/client";
import type { Result } from "../database/client";

async function createAdminUser() {
  try {
    console.log("🔐 Création d'un utilisateur administrateur...\n");

    const adminData = {
      email: "admin@streetart.com",
      pseudo: "AdminSAH",
      first_name: "Admin",
      last_name: "Street Art Hunter",
      password: "Admin123!",
      zip_code: 31000,
      is_admin: 1,
      avatar_url:
        "https://ui-avatars.com/api/?name=Admin&background=40e0d0&color=fff&size=200",
    };

    const [existingUsers] = await database.query<Result[]>(
      "SELECT id, email, is_admin FROM user WHERE email = ?",
      [adminData.email]
    );

    if (existingUsers.length > 0) {
      console.log("⚠️  Un utilisateur avec cet email existe déjà :");
      console.log(existingUsers[0]);
      console.log("\n💡 Pour le retrouver, utilisez :");
      console.log(`   Email: ${adminData.email}`);
      return;
    }

    const hashedPassword = await argon2.hash(adminData.password);

    const [result] = await database.query<Result>(
      `INSERT INTO user (email, pseudo, first_name, last_name, password_hash, zip_code, is_admin, avatar_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        adminData.email,
        adminData.pseudo,
        adminData.first_name,
        adminData.last_name,
        hashedPassword,
        adminData.zip_code,
        adminData.is_admin,
        adminData.avatar_url,
      ]
    );

    console.log("✅ Utilisateur administrateur créé avec succès !\n");
    console.log("📋 Informations de connexion :");
    console.log("─────────────────────────────────────────");
    console.log(`   ID         : ${result.insertId}`);
    console.log(`   Email      : ${adminData.email}`);
    console.log(`   Mot de passe : ${adminData.password}`);
    console.log(`   Pseudo     : ${adminData.pseudo}`);
    console.log(`   Rôle       : Administrateur`);
    console.log("─────────────────────────────────────────\n");

    console.log("🔍 Pour vérifier dans la base de données :");
    console.log(`   SELECT * FROM user WHERE email = '${adminData.email}';`);
    console.log("\n🌐 Connectez-vous sur : http://localhost:3001/connexion");
  } catch (error) {
    console.error(
      "❌ Erreur lors de la création de l'utilisateur admin :",
      error
    );
  } finally {
    await database.end();
    process.exit(0);
  }
}

createAdminUser();

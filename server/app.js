import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(morgan("dev"));
app.use(express.json());

const medicineData = [
        { id: 1, category: "Antibiotics", stock: 100, name: "Paracetamol", price: 10 },
        { id: 2, category: "Painkillers", stock: 50, name: "Crocin", price: 15 },
        { id: 3, category: "Antibiotics", stock: 75, name: "Amoxicillin", price: 20 },
        { id: 4, category: "Painkillers", stock: 130, name: "Ibuprofen", price: 25 },
        { id: 5, category: "Antibiotics", stock: 40, name: "Cephalexin", price: 30 },
        { id: 6, category: "Painkillers", stock: 20, name: "Naproxen", price: 35 },
        { id: 7, category: "Antibiotics", stock: 150, name: "Ciprofloxacin", price: 40 },
        { id: 8, category: "Painkillers", stock: 15, name: "Diclofenac", price: 45 },
        { id: 9, category: "Antibiotics", stock: 60, name: "Cefuroxime", price: 50 },
        { id: 10, category: "Antipyretics", stock: 180, name: "Dolo 650", price: 12 },
        { id: 11, category: "Antipyretics", stock: 90, name: "Calpol", price: 14 },
        { id: 12, category: "Antacids", stock: 60, name: "Pantoprazole", price: 25 },
        { id: 13, category: "Antacids", stock: 50, name: "Omeprazole", price: 20 },
        { id: 14, category: "Antacids", stock: 70, name: "Ranitidine", price: 18 },
        { id: 15, category: "Antihistamines", stock: 45, name: "Cetirizine", price: 15 },
        { id: 16, category: "Antihistamines", stock: 155, name: "Loratadine", price: 18 },
        { id: 17, category: "Antihistamines", stock: 40, name: "Fexofenadine", price: 22 },
        { id: 18, category: "Antifungal", stock: 35, name: "Fluconazole", price: 30 },
        { id: 19, category: "Antifungal", stock: 125, name: "Clotrimazole", price: 28 },
        { id: 20, category: "Antifungal", stock: 30, name: "Ketoconazole", price: 32 },
        { id: 21, category: "Vitamins", stock: 100, name: "Vitamin C", price: 10 },
        { id: 22, category: "Vitamins", stock: 95, name: "Vitamin D3", price: 12 },
        { id: 23, category: "Vitamins", stock: 185, name: "Vitamin B Complex", price: 20 },
        { id: 24, category: "Vitamins", stock: 90, name: "Multivitamin", price: 25 },
        { id: 25, category: "Cough Syrups", stock: 40, name: "Benadryl", price: 30 },
        { id: 26, category: "Cough Syrups", stock: 135, name: "Ascoril", price: 32 },
        { id: 27, category: "Cough Syrups", stock: 30, name: "Corex", price: 28 },
        { id: 28, category: "Cough Syrups", stock: 25, name: "Torex", price: 27 },
        { id: 29, category: "Antiseptics", stock: 160, name: "Dettol", price: 35 },
        { id: 30, category: "Antiseptics", stock: 55, name: "Savlon", price: 32 },
        { id: 31, category: "Antiseptics", stock: 45, name: "Betadine", price: 38 },
        { id: 32, category: "Antiviral", stock: 20, name: "Acyclovir", price: 45 },
        { id: 33, category: "Antiviral", stock: 215, name: "Oseltamivir", price: 50 },
        { id: 34, category: "Antiviral", stock: 15, name: "Favipiravir", price: 55 },
        { id: 35, category: "Steroids", stock: 110, name: "Prednisolone", price: 40 },
        { id: 36, category: "Steroids", stock: 15, name: "Dexamethasone", price: 45 },
        { id: 37, category: "Steroids", stock: 210, name: "Hydrocortisone", price: 50 },
        { id: 38, category: "Painkillers", stock: 60, name: "Aspirin", price: 20 },
        { id: 39, category: "Painkillers", stock: 55, name: "Ketorolac", price: 35 },
        { id: 40, category: "Painkillers", stock: 45, name: "Aceclofenac", price: 25 },
        { id: 41, category: "Antibiotics", stock: 70, name: "Azithromycin", price: 35 },
        { id: 42, category: "Antibiotics", stock: 615, name: "Clarithromycin", price: 40 },
        { id: 43, category: "Antibiotics", stock: 50, name: "Metronidazole", price: 22 },
        { id: 44, category: "Antibiotics", stock: 515, name: "Erythromycin", price: 28 },
        { id: 45, category: "Antibiotics", stock: 60, name: "Levofloxacin", price: 32 },
        { id: 46, category: "Antibiotics", stock: 715, name: "Doxycycline", price: 20 },
        { id: 47, category: "Antibiotics", stock: 80, name: "Tetracycline", price: 18 },
        { id: 48, category: "Antibiotics", stock: 40, name: "Clindamycin", price: 25 },
        { id: 49, category: "Antibiotics", stock: 35, name: "Linezolid", price: 55 },
        { id: 50, category: "Antibiotics", stock: 45, name: "Vancomycin", price: 65 },
        { id: 51, category: "Antacids", stock: 160, name: "Famotidine", price: 15 },
        { id: 52, category: "Antacids", stock: 55, name: "Esomeprazole", price: 28 },
        { id: 53, category: "Antacids", stock: 70, name: "Lansoprazole", price: 26 },
        { id: 54, category: "Antihistamines", stock: 40, name: "Chlorpheniramine", price: 12 },
        { id: 55, category: "Antihistamines", stock: 45, name: "Diphenhydramine", price: 18 },
        { id: 56, category: "Antihistamines", stock: 35, name: "Hydroxyzine", price: 22 },
        { id: 57, category: "Antifungal", stock: 30, name: "Terbinafine", price: 30 },
        { id: 58, category: "Antifungal", stock: 25, name: "Itraconazole", price: 35 },
        { id: 59, category: "Antifungal", stock: 20, name: "Amphotericin B", price: 60 },
        { id: 60, category: "Antiseptics", stock: 70, name: "Hydrogen Peroxide", price: 20 },
        { id: 61, category: "Antiseptics", stock: 65, name: "Chlorhexidine", price: 28 },
        { id: 62, category: "Antiseptics", stock: 60, name: "Povidone Iodine", price: 32 },
        { id: 63, category: "Vitamins", stock: 85, name: "Vitamin E", price: 25 },
        { id: 64, category: "Vitamins", stock: 80, name: "Vitamin K", price: 18 },
        { id: 65, category: "Vitamins", stock: 95, name: "Vitamin A", price: 15 },
        { id: 66, category: "Cough Syrups", stock: 40, name: "Ambroxol", price: 22 },
        { id: 67, category: "Cough Syrups", stock: 35, name: "Grilinctus", price: 28 },
        { id: 68, category: "Cough Syrups", stock: 25, name: "Chericof", price: 26 },
        { id: 69, category: "Cough Syrups", stock: 30, name: "Zedex", price: 30 },
        { id: 70, category: "Antidiabetic", stock: 50, name: "Metformin", price: 35 },
        { id: 71, category: "Antidiabetic", stock: 45, name: "Glimepiride", price: 38 },
        { id: 72, category: "Antidiabetic", stock: 40, name: "Sitagliptin", price: 50 },
        { id: 73, category: "Antidiabetic", stock: 35, name: "Insulin", price: 60 },
        { id: 74, category: "Antihypertensive", stock: 55, name: "Amlodipine", price: 25 },
        { id: 75, category: "Antihypertensive", stock: 50, name: "Losartan", price: 28 },
        { id: 76, category: "Antihypertensive", stock: 45, name: "Telmisartan", price: 30 },
        { id: 77, category: "Antihypertensive", stock: 40, name: "Enalapril", price: 35 },
        { id: 78, category: "Antidepressant", stock: 30, name: "Sertraline", price: 45 },
        { id: 79, category: "Antidepressant", stock: 25, name: "Fluoxetine", price: 40 },
        { id: 80, category: "Antidepressant", stock: 20, name: "Escitalopram", price: 50 },
        { id: 81, category: "Antidepressant", stock: 18, name: "Amitriptyline", price: 55 },
        { id: 82, category: "Antipsychotic", stock: 20, name: "Olanzapine", price: 60 },
        { id: 83, category: "Antipsychotic", stock: 18, name: "Risperidone", price: 55 },
        { id: 84, category: "Antipsychotic", stock: 15, name: "Quetiapine", price: 65 },
        { id: 85, category: "Anticonvulsant", stock: 125, name: "Sodium Valproate", price: 45 },
        { id: 86, category: "Anticonvulsant", stock: 22, name: "Carbamazepine", price: 48 },
        { id: 87, category: "Anticonvulsant", stock: 20, name: "Phenytoin", price: 42 },
        { id: 88, category: "Anticonvulsant", stock: 18, name: "Lamotrigine", price: 50 },
        { id: 89, category: "Antiemetic", stock: 30, name: "Ondansetron", price: 25 },
        { id: 90, category: "Antiemetic", stock: 25, name: "Domperidone", price: 22 },
        { id: 91, category: "Antiemetic", stock: 20, name: "Metoclopramide", price: 20 },
        { id: 92, category: "Antiemetic", stock: 18, name: "Cinnarizine", price: 28 },
        { id: 93, category: "Antimalarial", stock: 215, name: "Chloroquine", price: 35 },
        { id: 94, category: "Antimalarial", stock: 20, name: "Artemether", price: 40 },
        { id: 95, category: "Antimalarial", stock: 22, name: "Lumefantrine", price: 45 },
        { id: 96, category: "Antimalarial", stock: 18, name: "Primaquine", price: 38 },
        { id: 97, category: "Anthelmintic", stock: 130, name: "Albendazole", price: 25 },
        { id: 98, category: "Anthelmintic", stock: 28, name: "Mebendazole", price: 30 },
        { id: 99, category: "Anthelmintic", stock: 20, name: "Ivermectin", price: 35 },
        { id: 100, category: "Anthelmintic", stock: 15, name: "Praziquantel", price: 40 },
];

app.get("/", (req, res) => {
  res.redirect("/api/v1/medicine");
});

app.get("/api/v1/medicine", (req, res) => {
  res.status(200).json(medicineData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

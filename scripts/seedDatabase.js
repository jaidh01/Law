import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file directory (ES module equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Article Schema (same as in routes)
const ArticleSchema = new mongoose.Schema({
  title: String,
  slug: String,
  author: String,
  published_date: Date,
  content: String,
  excerpt: String,
  category: String,
  subcategory: String,
  tags: [String],
  source: String,
  image: String,
  imageCaption: String,
  pdf_url: String
}, { timestamps: true });

const Article = mongoose.model('Article', ArticleSchema);

// Sample article data based on your MongoDB structure
const sampleArticles = [
  {
    title: "Supreme Court Slams Pharmacy Council Of India Over Arbitrary Rejection Of Pharma College Approvals",
    slug: "supreme-court-slams-pharmacy-council-of-india",
    author: "Law Guru",
    published_date: new Date("2024-05-24"),
    content: "In the backdrop of multiple litigations being initiated against it by pharma colleges, the Supreme Court recently slammed the Pharmacy Council of India and said that expert bodies like it should act in a responsible manner.\n\n\"Looking at the facts in all these matters...we are of the considered opinion that it is high time that such bodies like Pharmacy Council of India, which is supposed to be expert in the field of specialized education, acts with due diligence. It is only on account of total lack of application of mind and exercise of powers in an arbitrary manner that this Court is flooded with petitions after petitions challenging the orders of the Pharmacy Council of India\", observed a bench of Justice BR Gavai (now CJI) and Justice AG Masih.\n\nWhile setting aside the Pharmacy Council's rejections of certain institutions' approvals, the Court directed the concerned Registrar to forward a copy of the order to the Secretary, Ministry of Health and Family Welfare, to take suitable action so that \"such unwarranted litigation\" can be avoided in future. \nThe Court was dealing with a batch of 14 cases filed by pharma colleges. In one of the cases, permission for extension of D.Pharm course was granted to the petitioner-institution, subject to inspection throughout the year. However, within a few months, the approval was rejected on the ground that the institution had not submitted its satisfactory compliance regarding various factors.\n\nThe Court opined that before rejecting the approval, Pharmacy Council ought to have carried out an inspection and given the petitioner-institution an opportunity to rectify any lacunae found. \"We find that the respondent/Pharmacy Council of India has acted in an arbitrary manner and therefore the decision dated 09.12.2024 is liable to be set aside\", it said. \n\nInsofar as the Pharmacy Council regularized the said institution's approval for 2024-25, in view of admissions granted to 46 students following the initial grant of permission, the Court observed that the Council had shown a \"charitable attitude\". However, it added, \"when an action of a statutory body is likely to affect the careers of large number of students, such bodies are expected to act in a manner which is in consonance with the principles of natural justice and non-arbitrariness.\"\n\nIn another \"classic example\" of Pharmacy Council's \"arbitrary attitude\", the Court noted that grant of extension of another institution's approval was subject to inspection throughout the year. An inspection was conducted and no deficiencies pointed out, yet the Pharmacy Council rejected the institution's approval. In this backdrop, the Court observed, \n\n\"It is, thus, clear that either the inspection report is not correct, or the Council has not applied its mind to the inspection report. As already observed by us in the matter of even date, we have observed that the respondent/Pharmacy Council of India cannot act in an arbitrary manner when such an action adversely affects the careers of thousands of students.\"\n\nAppearance: Solicitor General Tushar Mehta; Senior Advocates Devadutt Kamat, Sanjay Sharawat and Neeraj Jain\n\nCase Title: SHREE RAM COLLEGE OF PHARMACY Versus PHARMACY COUNCIL OF INDIA, W.P.(C) No. 24/2025 (and connected cases)",
    excerpt: "The Supreme Court slammed the Pharmacy Council of India over arbitrary rejection of pharma college approvals and directed the concerned Registrar to forward a copy of the order to the Secretary, Ministry of Health and Family Welfare.",
    category: "Supreme Court",
    subcategory:"Supreme Court",
    tags: ["Supreme Court", "Pharmacy Council", "Education", "Law"],
    source: "Law Guru",
    image: "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg",
    pdf_url: "https://drive.google.com/file/d/1htCjflGnzDpicK-hCPSFBY6wG2HmpRoM/view?usp=sharing"
  },
  // Add more sample articles as needed
  {
    title: "Standard Form Employment Contracts: Supreme Court Lays Down Principles Of Interpretation",
    slug: "supreme-court-employment-bond-ruling",
    author: "Law Guru",
    published_date: new Date("2025-05-24"),
    content: "The Supreme Court recently outlined the legal principles applicable to interpreting standard form contracts often viewed as weaker contracts from the employee's perspective typically drafted unilaterally by employers (such as corporations or institutions) and offered to employees on a “take-it-or-leave-it” basis.\n\nThe bench comprising Justices PS Narasimha and Joymalya Bagchi laid down legal principles relating to the interpretation of standard form employment contracts, summarized as follows:\n\n(i) Standard form employment contracts prima facie evidence unequal bargaining power.\n(ii) Whenever the weaker party to such a contract pleads undue influence/coercion or alleges that the contract or any term thereof is opposed to public policy, the Court shall examine such plea keeping in mind the unequal status of the parties and the context in which the contractual obligations were created.\n(iii) The onus to prove that a restrictive covenant in an employment contract is not in restraint of lawful employment or is not opposed to public policy, is on the covenantee i.e., the employer and not on the employee.\n\nThe Court said that although the standard form of contract creates an unequal bargaining power to the employee, it cannot be invalidated solely on that ground unless it is shown that the contract's term is oppressive, unconscionable, or against public policy.\n\nIf an employee challenges a contract as oppressive, unconscionable, or contrary to public policy, the Court must assess it in light of the inherent power imbalance, considering whether the employee was in a vulnerable position, whether the penalty clause is disproportionately harsh compared to the employee's salary, and whether it far exceeds the actual losses suffered by the employer (such as a bank) in the event of early resignation.\n\nThe Court made these observations while hearing a plea by a bank which required its employee to pay ₹2 lakhs penalty if they resigned before completing the mandatory three-year service period prescribed before joining another bank. Upon his switch to another bank, the Appellant made the Respondent pay ₹2 lakh penalty, against which the Respondent filed a writ petition before the High Court. Aggrieved by the High Court's decision declaring the execution of bond as restrictive trade practices under Section 27 of the Contract Act, the Bank appealed to the Supreme Court.\n\nSetting aside the High Court's decision, the judgment authored by Justice Bagchi emphasized that exclusivity clauses cannot be termed as restrictive of trade practices under Section 27 of the Contract Act, as such clauses do not restrict future employment but only impose a financial penalty for early exit.\n\n\"A plain reading of clause 11(k) shows restraint was imposed on the respondent to work for a minimum term i.e., three years and in default to pay liquidated damages of ₹2 Lakhs. The clause sought to impose a restriction on the respondent's option to resign and thereby perpetuated the employment contract for a specified term. The object of the restrictive covenant was in furtherance of the employment contract and not to restrain future employment. Hence, it cannot be said to be violative of Section 27 of the Contract Act.\"\n\nThe Court rejected the Respondent's argument that such exclusivity clauses were unconscionable and part of a standard-form contract with no negotiation scope. Instead, the Court stated such clause to be reasonable given the fact that public sector undertakings need to retain skilled staff, and early exit prompts them to incur high costs of re-recruitment.\n\n\"The appellant-bank is a public sector undertaking and cannot resort to private or ad-hoc appointments through private contracts. An untimely resignation would require the Bank to undertake a prolix and expensive recruitment process involving open advertisement, fair competitive procedure lest the appointment falls foul of the constitutional mandate under Articles 14 and 16.\", the court said.\n\nThus, the Court justified the imposition of ₹2 lakhs penalty, stating that it was not excessive for a Respondent, who was a Senior Manager (MMG-III) drawing a lucrative salary.",
    excerpt: "The Supreme Court upheld a bank's employment bond penalty, outlining key principles for interpreting standard-form contracts and their enforceability under Indian law.",
    category: "Supreme Court",
    subcategory:"Supreme Court",
    tags: ["Supreme Court", "Employment Bond", "Justice JB Pardiwala and Justice R Mahadevan", "Order I Rule 10 CPC", "SULTHAN SAID IBRAHIM VERSUS PRAKASAN & ORS."],
    source: "Law Guru",
    image: "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg",
    pdf_url: "https://drive.google.com/file/d/1htCjflGnzDpicK-hCPSFBY6wG2HmpRoM/view?usp=sharing"
  },
  {
    title: "Delhi Govt Implements SOP For Handling Bomb Threats In Schools, High Court Closes Contempt Plea",
    slug: "delhi-hc-bomb-threat-sop",
    author: "Law Guru",
    published_date: new Date("2025-05-24"),
    content: "The Delhi High Court has closed a contempt petition after the Delhi Government's Director of Education implemented the Standard Operating Procedure (SOP) for handling bomb threats in schools in the national capital.\n\nJustice Anish Dayal noted that the SOP has been notified, along with the role of the Delhi Police duly delineated thereunder.\n\nThe Court disposed of the contempt petition filed by Advocate Arpit Bhargava and appreciated him for initiating the plea in public interest in order that the life and safety of the children, teachers, staff, stakeholders, and educational institutions may not be jeopardized.\n\nThe Court noted that the detailed SOP was made along with a comprehensive checklist which will enable the concerned stakeholders to ensure that these procedures are being complied with.\n\nThe notification stated that the SOP outlines preventive, preparatory, responsive, and recovery measures to be adopted by all stakeholders in the event of bomb threats in schools.\n\nIt further states that all heads of schools must ensure strict compliance and implementation of the SOP in their respective schools with immediate effect. The checklist must be duly filled and submitted monthly by the head of the school to the concerned district authority for review and further action, it adds.\n\nThe counsel for the Directorate of Education stated that the SOP has already been sent to schools and all the other stakeholders with directions that it should be complied with.\n\nAdditional DD for the Directorate of Education stated that a circular has been issued informing all the schools of the SOP and its immediate implementation.\n\n“In this view of the matter, the petition is disposed of. The assistance of Ms. Beenashaw N Soni, appearing for petitioner, along with petitioner who appears in person, who had initiated this petition in public interest in order that the life and safety of the children, teachers, staff and stakeholders and educational institutions may not be jeopardized, is highly appreciated,” the Court said.",
    excerpt: "The Delhi High Court disposed of a contempt petition after the Delhi Government implemented an SOP for handling bomb threats in schools, ensuring safety for students and staff.",
    category: "High Courts",
    subcategory: "Delhi High Court",
    tags: ["Delhi High Court", "Bomb Threat", "School Safety", "SOP", "Delhi Government"],
    source: "Law Guru",
    image: "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg",
    pdf_url: "https://drive.google.com/file/d/18E8vLe5tUM6u1JXZCpuSyL9M8-9oEnX8/view?usp=sharing"
  },
  {
    title: "Delhi High Court Denies Bail in Army Espionage Case, Citing National Security Concerns",
    slug: "delhi-hc-espionage-bail-denied",
    author: "Law Guru",
    published_date: new Date("2025-05-22"),
    content: "The Delhi High Court has rejected the bail plea of Mohsin Khan, an accused in an Army espionage case, citing grave concerns over national security.\n\nJustice Swarana Kanta Sharma, who presided over the matter, underscored that acts of espionage strike at the very core of the nation's integrity and sovereignty, and must therefore be dealt with stringently.\n\nThe prosecution alleged that Khan played a central role in transmitting confidential information related to the Indian Army to the Pakistan High Commission. It was further claimed that he was involved in clandestine financial transactions to support these activities.\n\nTaking cognizance of the seriousness of the allegations, the Court stated that in cases involving national security and espionage, the threshold for granting bail must be higher. It observed that the material on record demonstrated prima facie involvement of the accused in the larger conspiracy.\n\nThe Court noted that national security and the vigilance of the armed forces are critical to peace and stability, and that such offences go beyond individual acts, affecting the country as a whole.\n\nAccordingly, the Court dismissed the bail application, and Khan will remain in judicial custody as investigations proceed.\n\nThe order was passed in the matter titled *Mohsin Khan v. State Govt. of NCT of Delhi* (Bail Application No. 1356/2025).",
    excerpt: "The Delhi High Court has denied bail to Mohsin Khan in an Army espionage case, citing national security risks and serious allegations of passing classified information to Pakistan.",
    category: "High Courts",
    subcategory: "Delhi High Court",
    tags: ["Delhi High Court", "Espionage", "Army Secrets", "National Security"],
    source: "Law Guru",
    image: "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg",
    pdf_url: "https://drive.google.com/file/d/18E8vLe5tUM6u1JXZCpuSyL9M8-9oEnX8/view?usp=sharing"
  },
  {
    title: "Rajasthan High Court Quashes Police Complaint Over Alleged Caste Slur After 17 Years",
    slug: "rajasthan-hc-manual-scavenging-deaths",
    author: "Law Guru",
    published_date: "2025-05-24",
    content: "In a crucial step toward ensuring dignity and safety for sanitation workers, the Rajasthan High Court has taken suo motu cognizance of the recent spate of deaths arising from manual scavenging, a practice banned under Indian law but still alarmingly prevalent in many states. The Division Bench of Justices Inderjeet Singh and Anand Sharma issued notices to top state officials, including the Additional Chief Secretary, Department of Social Justice and Empowerment, and the Principal Secretary, Local Self Government Department, demanding an immediate explanation on continued violations.\n\nThe PIL was filed by the Snehansh Foundation, a social justice organization working in the field of manual scavenger rehabilitation. The petition was prompted by the tragic death of three sanitation workers in Bikaner’s Mukta Prasad Colony on May 5, 2025, due to asphyxiation while cleaning a septic tank without proper safety equipment. The petitioner cited that this incident was not isolated but part of a disturbing trend, with over 11 similar deaths reported across Rajasthan in the past two months alone.\n\nJustice Inderjeet Singh observed, “Despite the prohibition under the Prohibition of Employment as Manual Scavengers and their Rehabilitation Act, 2013, the deaths continue unabated. This reflects a glaring lapse in enforcement and governance.” The Court also expressed dismay that the Safai Karamchari Commission had failed to effectively monitor or intervene in such high-risk operations.\n\nThe petition requested the Court to direct:\n1. A comprehensive state-wide audit of sanitation work involving human entry into hazardous spaces.\n2. Formation of a high-level monitoring committee headed by a retired High Court judge.\n3. Real-time public disclosure of safety fund allocations and utilization by municipalities.\n4. Mandatory deployment of mechanized cleaning solutions.\n\nThe bench further remarked: “This Court cannot be a silent spectator when lives are being lost due to administrative apathy. Human life is not expendable, and the constitutional guarantee of the Right to Life must be upheld for all citizens, especially the marginalized.”\n\nThe matter has been listed for further hearing on June 10, 2025, with the Court directing the State to file a detailed affidavit outlining past incidents, rehabilitation measures, and protocols implemented since 2013.\n\nThe case marks a significant judicial intervention into the persisting problem of caste-based sanitation labor and affirms the High Court’s constitutional mandate to uphold human dignity.",
    excerpt: "The Rajasthan High Court has sought a response from the state government on the increasing number of manual scavenging deaths, emphasizing the need for immediate action and accountability.",
    category: "High Courts",
    subcategory: "Rajasthan High Court",
    tags: ["Rajasthan High Court", "Manual Scavenging", "Human Rights", "Public Interest Litigation", "Snehansh Foundation"],
    source: "Law Guru",
    image: "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg",
    pdf_url: "https://drive.google.com/file/d/1htCjflGnzDpicK-hCPSFBY6wG2HmpRoM/view?usp=sharing"
  },
  {
    title: "Rajasthan HC Slams Gender Bias: Orders AFMS to Admit Student Rejected for Menstrual Anemia",
    slug: "rajasthan-hc-menstrual-anemia-admission",
    author: "Law Guru",
    published_date: "2025-05-24",
    content: "In a landmark ruling upholding women’s right to equality in education, the Rajasthan High Court directed the Armed Forces Medical Services (AFMS) to admit a female candidate who had been unfairly denied entry into the BSc Nursing course due to anemia caused by menstruation-related health conditions.\n\nThe petitioner, Sakshi Choudhary, had cleared the written examination and interview rounds for the Armed Forces Medical College Nursing program. However, she was declared medically unfit during the medical examination on account of low hemoglobin levels, a temporary condition resulting from heavy menstrual bleeding.\n\nPresiding over the case, Justice Anoop Kumar Dhand delivered a strongly worded judgment: “Disqualifying a woman for admission to a professional course solely based on temporary menstruation-induced anemia is discriminatory and unconstitutional. Such decisions fail to take into account biological realities and reinforce patriarchal barriers in professional education.”\n\nThe Court noted that a subsequent medical examination ordered during the pendency of the writ petition showed that Sakshi’s hemoglobin levels had returned to normal, and she was found medically fit. The judge observed: “Medical ineligibility must be based on sustained incapacity or permanent conditions. A passing phase of low hemoglobin cannot be the sole ground for rejection.”\n\nThe judgment emphasized that educational institutions, especially those linked with national defense and public service, must adopt a compassionate, science-based, and gender-sensitive approach when dealing with women's health conditions. “Menstruation is a natural biological function, not a disability,” Justice Dhand stated.\n\nThe Court also referred to Articles 14 and 15 of the Constitution, which guarantee equality before the law and prohibit discrimination based on sex. “It is imperative for public institutions to promote inclusive policies rather than rigid and outdated medical criteria,” the Court held.\n\nAccordingly, the Rajasthan High Court quashed the AFMS decision and ordered immediate admission of the petitioner into the 2025-26 BSc Nursing batch, ensuring she would not lose her academic year.\n\nThe judgment has been hailed by women’s rights groups as a progressive move and a precedent for inclusive medical admissions going forward.",
    excerpt: "Rajasthan High Court orders Armed Forces Medical Services to admit student rejected due to menstruation-related anemia, calling the disqualification discriminatory.",
    category: "High Courts",
    subcategory: "Rajasthan High Court",
    tags: ["Rajasthan High Court", "Women's Rights", "Education Equality", "Menstrual Health", "Sakshi Choudhary", "Medical Disqualification"],
    source: "Law Guru",
    image: "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg",
    pdf_url: "https://drive.google.com/file/d/1htCjflGnzDpicK-hCPSFBY6wG2HmpRoM/view?usp=sharing"
  }

];

const seedDatabase = async () => {
  try {
    // Delete existing articles
    await Article.deleteMany({});
    console.log('Deleted existing articles');
    
    // Insert sample articles
    const result = await Article.insertMany(sampleArticles);
    console.log(`Inserted ${result.length} articles`);
    
    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the seed function
seedDatabase();
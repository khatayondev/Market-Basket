
HO TECHNICAL UNIVERSITY
Faculty of Applied Science & Technology
Department of Computer Science
SUPERMARKET BASKET ANALYSIS DASHBOARD
Complete Project Documentation & Developer Guide

BCSC 406: Data Mining and Warehousing
Second Semester, 2025/2026 Academic Year

Group 2  ·  Lecturer: George K. Agordzo
Dataset: Groceries Dataset  (38,765 purchase records)
Stack: Python · Streamlit · Scikit-learn · MLxtend · SQLite · Plotly

 
Table of Contents


 
1. Project Overview
1.1 Introduction
This document is the complete reference guide for the Supermarket Basket Analysis Dashboard developed for BCSC 406: Data Mining and Warehousing. It covers every feature, every file, every algorithm, and every configuration decision made during development, providing everything needed to understand, run, extend, and present the system.

1.2 Project Aim
To design and develop an interactive dashboard that supports market basket analysis on real supermarket transaction data, enabling managers to discover which products are frequently bought together, understand customer purchasing habits, and make data-driven decisions on product placement, promotions, and inventory management.

1.3 Dataset Summary
Metric	Value	Notes
Source	Kaggle	Groceries Dataset by Heerald Edhia
Total rows	38,765	Raw purchase records
After cleaning	38,006	759 duplicates removed
Unique customers	3,898	Member_number field
Unique transactions	14,963	Member + Date combination
Unique items	167	Distinct grocery products
Item categories	10	Dairy, Produce, Bakery, etc.
Date range	Jan 2014 – Oct 2015	~22 months of transactions
Avg basket size	2.59 items	Per transaction (low — typical of top-up shopping)

1.4 Technology Stack
Layer	Technology	Version	Purpose
UI Framework	Streamlit	1.35.0	Interactive web dashboard
Data Processing	Pandas / NumPy	2.2 / 1.26	Data manipulation
Machine Learning	Scikit-learn	1.5.0	Classification & clustering
Association Mining	MLxtend	0.23.1	Apriori & FP-Growth
Visualisation	Plotly	5.22.0	Interactive charts & heatmaps
Data Warehouse	SQLite	Built-in	Star schema storage
Scipy	SciPy	1.13.1	Hierarchical clustering dendrogram

1.5 Key Difference from Group 1 (Retail Sales)
Aspect	Group 1 — Retail Sales	Group 2 — Basket Analysis
Dataset size	525,461 rows, 8 columns	38,765 rows, 3 columns
Primary focus	Revenue trends & sales performance	Product associations & basket patterns
Target variable	RevenueClass (Low/Medium/High £)	CustomerClass (Small/Medium/Large basket)
Clustering basis	RFM (Recency, Frequency, Monetary)	6 purchase-behaviour features
Unique chart	Revenue line trend, KPI £ metrics	Co-purchase heatmap (167×167 item matrix)
Association data	Invoice-level baskets (avg 15+ items)	Member+Date baskets (avg 2.59 items — lower support needed)
 
2. Complete Folder Structure
The project follows a modular structure identical in layout to Group 1 but adapted for grocery basket data. Each page is a standalone Python file; shared logic lives in the utils/ package.

supermarket_dashboard/
├── app.py                      ← Main Streamlit entry point
├── requirements.txt            ← All Python dependencies
├── warehouse.db                ← Auto-generated SQLite warehouse
│
├── data/
│   └── Groceries_dataset.csv   ← Source dataset (Kaggle)
│
├── pages/
│   ├── page_home.py            ← Home page & project overview
│   ├── page_dataset.py         ← Raw data preview & quality checks
│   ├── page_preprocess.py      ← Cleaning pipeline & warehouse builder
│   ├── page_explore.py         ← Charts, heatmaps & time trends
│   ├── page_assoc.py           ← Association: Apriori + FP-Growth
│   ├── page_classify.py        ← Classification: 4 algorithms
│   └── page_cluster.py         ← Clustering: K-Means + Hierarchical
│
└── utils/
    ├── preprocess.py           ← Cleaning, feature engineering, CATEGORY_MAP
    └── warehouse.py            ← SQLite star schema ETL helpers

2.1 File Responsibilities
File	Responsibility	Key functions
app.py	Sidebar nav, page routing via importlib	Routes to all 7 page modules
utils/preprocess.py	Full ETL pipeline, CATEGORY_MAP (167 items → 10 categories), customer features	clean_data(), build_customer_features(), get_cleaning_report()
utils/warehouse.py	SQLite star schema creation (4 tables) and querying	build_warehouse(), warehouse_exists(), query_warehouse()
page_home.py	Project landing page with KPIs and module overview	Static display + dataset check
page_dataset.py	Raw preview, column info, item analysis, date range	load_raw_uncached()
page_preprocess.py	9-step cleaning UI + warehouse ETL trigger	clean_data(), build_warehouse()
page_explore.py	5 tabs: item freq, category pie, time trends, co-purchase heatmap, basket dist.	Plotly express + co-occurrence matrix
page_assoc.py	Basket matrix build, Apriori + FP-Growth, rules, network graph	apriori(), fpgrowth(), association_rules()
page_classify.py	4 classifiers on customer-level features, confusion matrices	DT, RF, NB, KNN from sklearn
page_cluster.py	Elbow, K-Means, Hierarchical on 6 behaviour features	KMeans, AgglomerativeClustering, dendrogram
 
3. Installation & Running
3.1 Prerequisites
•	Python 3.9 or higher
•	pip package manager
•	Groceries_dataset.csv in the data/ folder
•	At least 512 MB RAM (dataset is small — 38K rows)

3.2 Step-by-Step Setup
1.	Unzip: unzip supermarket_dashboard.zip
2.	Navigate: cd supermarket_dashboard
3.	Install dependencies: pip install -r requirements.txt
4.	Run: streamlit run app.py
5.	Open browser at: http://localhost:8501

3.3 First-Run Workflow
6.	Go to Preprocessing — click Run Preprocessing
7.	Click Build Data Warehouse
8.	All other pages will load clean data automatically from session state

Note: Streamlit session state resets on browser refresh. Re-run Preprocessing if data disappears. The SQLite warehouse.db file persists on disk between sessions.

3.4 requirements.txt
streamlit==1.35.0
pandas==2.2.2
numpy==1.26.4
scikit-learn==1.5.0
matplotlib==3.9.0
seaborn==0.13.2
plotly==5.22.0
mlxtend==0.23.1
scipy==1.13.1
 
4. Complete Feature List
4.1 Home Page
•	Project title, subtitle, course and group information
•	5 KPI metrics: total records, customers, transactions, unique items, date range
•	6 module overview cards (one per page)
•	Dataset column reference table (Member_number, Date, itemDescription)
•	Dataset file check with fallback uploader
•	Academic information panel

4.2 Dataset Management Module
•	5 KPI metrics: rows, columns, missing values, duplicates, memory (MB)
•	Row count slider for data preview (5–100 rows)
•	Column information table: dtype, non-null count, null %, unique count, sample
•	Top 20 most purchased items table with count and % of records
•	Purchase frequency stats per customer (describe() output)
•	Date range display: earliest, latest, total span in days
•	Sample customer basket viewer: pick any Member_number to see all their purchases

4.3 Data Preprocessing Module
•	Displays all 9 cleaning steps with explanations and row counts before applying
•	Raw data preview (before)
•	One-click Run Preprocessing button
•	Cleaning report table with final row count and rows removed
•	Clean data preview (after)
•	New engineered columns preview: TransactionID, Year, Month, Quarter, DayOfWeek, Category, BasketSize, BasketClass
•	Basket class distribution table (Small/Medium/Large counts and %)
•	Category distribution table (10 categories with item counts)
•	Build Data Warehouse button: triggers SQLite ETL (4 tables)

4.4 Data Exploration Module — 5 Tabs
•	5 KPI cards at top: total records, unique transactions, customers, items, avg basket size

Tab 1 — Item Frequency:
–	Top N items bar chart (slider: 5–50), colour gradient by frequency
–	Frequency table with count and % of all records
–	Business insight caption

Tab 2 — Category Share:
–	Donut pie chart: purchase share by product category
–	Bar chart: number of unique items per category
–	Insight on dominant categories

Tab 3 — Time Trends:
–	Monthly transactions line chart + monthly items line chart
–	Weekly transactions line chart
–	Day-of-week bar chart showing busiest shopping days
–	Activity heatmap: Month × Day of Week (transaction count)

Tab 4 — Co-purchase Heatmap (unique to Group 2):
–	Adjustable item count (10–30 items)
–	Co-occurrence matrix computed from all baskets
–	Full colour heatmap: bright = frequently bought together
–	Top 20 co-purchased pairs ranked table

Tab 5 — Basket Distribution:
–	Histogram of basket sizes (items per transaction)
–	4 metrics: mean, median, max, % single-item transactions
–	Basket class donut chart (Small/Medium/Large)

4.5 Association Rule Mining Module
•	Explanation table: Support, Confidence, Lift definitions
•	Max transactions slider (500–14,963)
•	Min support slider (0.001–0.10, default 0.005 — tuned for grocery basket size)
•	Min confidence slider (0.05–0.90, default 0.10)
•	Min lift filter (0.5–6.0, default 1.0)
•	Algorithm selector: Apriori, FP-Growth, or Both
•	Basket matrix dimensions displayed
Per-algorithm tab:
–	4 KPI cards: frequent itemsets, rules found, max confidence, max lift
–	Top frequent itemsets table with support and support %
–	Bar chart of top 15 itemsets by support
–	Full association rules table
–	Scatter: confidence vs lift, bubble size = support
–	Horizontal bar chart: top 10 rules by lift
–	Association network graph: product nodes + co-purchase edges
•	Comparison tab (Both selected): side-by-side metrics table
•	Apriori vs FP-Growth explanation panel
•	6-point supermarket business recommendations panel

4.6 Classification Module
•	Target variable explanation: CustomerClass (Small/Medium/Large basket)
•	Customer class distribution bar chart
•	6 customer-level features computed per customer before training:
–	TotalTransactions: number of unique shopping trips
–	TotalItems: total grocery items purchased
–	UniqueItems: number of distinct products ever bought
–	AvgBasketSize: mean items per transaction
–	ItemsPerTransaction: TotalItems / TotalTransactions
–	DiversityScore: UniqueItems / TotalItems (variety measure)
–	ActiveDays: number of distinct calendar days shopped
•	Feature selection multiselect (all 7 features default)
•	Test size slider: 10–40%
•	Train/test split sizes displayed
•	4 algorithms trained with progress bar:
–	Decision Tree (max_depth=8)
–	Random Forest (100 estimators, max_depth=10, n_jobs=-1)
–	Naive Bayes (GaussianNB, StandardScaler applied)
–	K-Nearest Neighbour (k=7, StandardScaler applied)
•	Model comparison table with green highlighting on best values
•	Grouped bar chart: 4 metrics × 4 algorithms
•	Per-algorithm tabs with: 4 metric cards, confusion matrix heatmap, classification report, feature importance (DT/RF), decision tree rules text (DT)
•	Best model announcement and business interpretation panel

4.7 Clustering Module
•	Feature explanation table: 6 customer behaviour dimensions
•	Customer feature table preview
•	Feature selection multiselect
Elbow analysis:
–	Inertia vs k chart (2 to user-chosen max)
–	Silhouette score vs k chart
–	Recommended k announcement
K-Means section:
–	k slider (2–8)
–	Scatter: Transactions vs Unique Items coloured by cluster
–	Scatter: Basket Size vs Diversity Score
–	Scatter: Total Items vs Active Days
–	Cluster profile table with customer count
–	Radar chart of normalised feature profiles per cluster
–	Cluster interpretation guide (Loyal, Quick-Trip, Explorer, Infrequent)
Hierarchical Clustering section:
–	Linkage method selector: ward, complete, average
–	Dendrogram on 250-customer sample (matplotlib)
–	Full clustering with silhouette score
–	Scatter and cluster profile table
–	K-Means vs Hierarchical comparison panel
 
5. Data Warehouse Design
5.1 Schema Type
The warehouse uses a Star Schema. One central fact table (fact_purchases) holds all transactional records; three dimension tables hold descriptive attributes for customers, items, and dates. SQLite is used as the database engine — no installation required, stored as a single file (warehouse.db).

5.2 Star Schema Layout
                    dim_date                 
                       |                     
dim_customer ── fact_purchases ── dim_item    

5.3 Table Definitions
fact_purchases (Central Fact Table)
Column	Type	Key	Description
purchase_id	INTEGER	PK	Auto-increment surrogate key
transaction_id	TEXT		Member_number + Date string
customer_id	INTEGER	FK	Links to dim_customer
item_name	TEXT	FK	Links to dim_item
date	TEXT	FK	Links to dim_date
year	INTEGER		Calendar year
month	INTEGER		Month number 1–12
quarter	INTEGER		Quarter number 1–4
basket_size	INTEGER		Items in this transaction
basket_class	TEXT		Small / Medium / Large
category	TEXT		Product category of this item

dim_customer
Column	Description
customer_id (PK)	Member_number from source data
total_transactions	Unique shopping trips
total_items	Total items purchased across all trips
unique_items	Number of distinct products ever bought
avg_basket_size	Mean items per transaction
favourite_category	Most frequently purchased product category

dim_item
Column	Description
item_id (PK)	Auto-increment surrogate key
item_name	Grocery item name (from itemDescription)
category	One of 10 product categories

dim_date
Column	Description
date_id (PK)	Auto-increment surrogate key
date	Calendar date as text (YYYY-MM-DD)
year	4-digit year
month	Month number (1–12)
month_name	Month abbreviation (Jan, Feb, …)
quarter	Quarter number (1–4)
day_of_week	Day name (Monday, Tuesday, …)
week_of_year	ISO week number (1–53)
 
6. ETL Process
6.1 Extract
•	Source: Groceries_dataset.csv (3 columns: Member_number, Date, itemDescription)
•	Library: pandas.read_csv()
•	Raw rows: 38,765

6.2 Transform — 9 Cleaning Steps
#	Step	Impact	Reason
1	Parse dates	All rows	DD-MM-YYYY string → datetime for time features
2	Drop missing values	0 rows	Dataset is complete — no nulls found
3	Remove duplicates	759 removed	Exact duplicate rows add no information
4	Standardise item names	All rows	Strip whitespace from itemDescription
5	Create TransactionID	New column	Member_number + Date → unique transaction key
6	Extract time features	7 new columns	Year, Month, MonthName, Quarter, DayOfWeek, WeekOfYear
7	Map item categories	New column	167 items mapped to 10 categories via CATEGORY_MAP dict
8	Compute BasketSize	New column	Items per transaction — used as feature and for classification target
9	Create BasketClass	New column	Small ≤2, Medium 3–4, Large ≥5 — classification target

6.3 Load
•	Database: SQLite (warehouse.db — auto-created in project root)
•	4 tables created in order: dim_date, dim_customer, dim_item, fact_purchases
•	Full refresh strategy: all tables are dropped and recreated on each build
•	fact_purchases: 38,006 rows (one per purchase record after cleaning)
•	dim_customer: 3,898 rows (one per unique customer with aggregated features)

6.4 Engineered Features
Feature	Formula	Used by
TransactionID	Member + Date	All modules — unique basket identifier
BasketSize	Items per TransactionID	Classification (feature), Exploration, Clustering
BasketClass	Small/Medium/Large by size	Classification — target variable
Category	CATEGORY_MAP lookup	Exploration pie, dim_item table, customer FavouriteCategory
DiversityScore	UniqueItems / TotalItems	Clustering — measures purchase variety
ItemsPerTransaction	TotalItems / TotalTransactions	Clustering, Classification feature

6.5 CATEGORY_MAP
The CATEGORY_MAP dictionary in utils/preprocess.py maps all 167 grocery items to one of 10 categories. This is used throughout the dashboard for filtering, visualisation, and the dim_item warehouse table.
Category	Example items	Item count (approx.)
Dairy	whole milk, yogurt, butter, cream cheese	~15 items
Produce	other vegetables, root vegetables, tropical fruit	~14 items
Bakery	rolls/buns, pastry, brown bread, white bread	~8 items
Beverages	soda, bottled water, beer, coffee, wine, spirits	~25 items
Meat & Fish	sausage, beef, chicken, fish, ham	~15 items
Snacks & Sweets	chocolate, candy, ice cream, nut snack	~14 items
Condiments	jam, ketchup, mustard, oil, salt, spices	~16 items
Household	detergent, napkins, kitchen towels, candles	~20 items
Personal Care	dental care, skin care, soap, hair spray	~8 items
Other / Pet & Baby	pot plants, newspapers, dog food, cat food	~12 items
 
7. Data Mining Algorithms
7.1 Association Rule Mining — PRIMARY MODULE
Association rule mining is the core technique for Group 2. It discovers which grocery products are frequently bought together in the same basket (transaction). A basket here is defined as all items purchased by the same customer on the same date.

Important: Grocery basket analysis uses lower support thresholds than retail (Group 1) because baskets average only 2.59 items. With such small baskets, few item pairs appear together frequently. The default support is 0.005 (0.5%) rather than 2%.

7.1.1 Basket Matrix Construction
•	Transaction = Member_number + Date (same customer, same day = one basket)
•	14,963 unique transactions built from 38,006 records
•	TransactionEncoder from MLxtend converts item lists to a binary True/False matrix
•	Matrix shape: 14,963 rows (transactions) × 167 columns (items)
•	Each cell = True if that item was in that basket, False otherwise

7.1.2 Apriori
•	Library: mlxtend.frequent_patterns.apriori
•	Parameters: min_support=0.005 (default), use_colnames=True, low_memory=True
•	How it works: generates candidate itemsets level by level, prunes below min_support
•	Limitation: multiple database scans — slower on large item sets

7.1.3 FP-Growth
•	Library: mlxtend.frequent_patterns.fpgrowth
•	Parameters: same min_support threshold as Apriori
•	How it works: builds a compressed FP-Tree, mines patterns without repeated scanning
•	Advantage: significantly faster — recommended for production grocery systems
•	Both algorithms produce identical rules given the same parameters

7.2 Classification Algorithms
Classification predicts which basket size category a customer belongs to based on their historical purchase behaviour. Unlike Group 1 (which classifies individual transactions), Group 2 classifies customers — one row per customer using aggregated features.

7.2.1 Decision Tree
•	Library: sklearn.tree.DecisionTreeClassifier
•	Parameters: max_depth=8, random_state=42
•	Input: raw customer features (no scaling needed for trees)
•	Output: classification rules, feature importance, confusion matrix
•	Test result: 92.56% accuracy

7.2.2 Random Forest
•	Library: sklearn.ensemble.RandomForestClassifier
•	Parameters: n_estimators=100, max_depth=10, random_state=42, n_jobs=-1
•	Input: same raw customer features
•	Best performer: 96.67% accuracy — ensemble of 100 trees reduces overfitting

7.2.3 Naive Bayes
•	Library: sklearn.naive_bayes.GaussianNB
•	Input: StandardScaler applied first
•	Test result: 75.64% — better than Group 1 NB because customer-level features are more independent than transaction-level features

7.2.4 K-Nearest Neighbour
•	Library: sklearn.neighbors.KNeighborsClassifier
•	Parameters: n_neighbors=7, n_jobs=-1
•	Input: StandardScaler applied first
•	Test result: 92.18% accuracy

7.3 Clustering Algorithms
Clustering groups customers by their purchasing behaviour without predefined labels. The 6 customer features computed by build_customer_features() are scaled before clustering.

7.3.1 K-Means
•	Library: sklearn.cluster.KMeans
•	Parameters: n_clusters=user-selected (default 4), n_init=10, random_state=42
•	Input: StandardScaled 6-feature customer vectors
•	Evaluation: Silhouette score (0.35 with k=4 — reasonable for behavioural data)
•	Outputs: 3 scatter plots, radar chart, cluster profile table

7.3.2 Hierarchical (Agglomerative)
•	Library: sklearn.cluster.AgglomerativeClustering
•	Parameters: n_clusters=user-selected, linkage=ward/complete/average
•	Dendrogram: scipy.cluster.hierarchy on 250-customer sample (matplotlib)
•	Advantage: dendrogram shows natural cluster boundaries without specifying k first

7.4 Evaluation Metrics
Metric	Module	Definition
Accuracy	Classification	Correct predictions / total predictions
Precision	Classification	Of predicted positives, how many are truly positive
Recall	Classification	Of actual positives, how many were correctly found
F1-Score	Classification	Harmonic mean of Precision and Recall
Silhouette Score	Clustering	Cluster separation quality (−1 to 1, higher = better)
Support	Association	Fraction of transactions containing the itemset
Confidence	Association	P(B|A) — probability of consequent given antecedent
Lift	Association	How much more likely than random — lift > 1 = real pattern
 
8. Key Functions Reference
8.1 utils/preprocess.py
clean_data(df)
Input: raw DataFrame from CSV. Output: cleaned DataFrame with 8 new columns.
•	Parses dates, strips whitespace, drops duplicates
•	Creates TransactionID, extracts time features, maps categories
•	Adds BasketSize (per transaction) and BasketClass (Small/Medium/Large)

get_cleaning_report(raw, clean)
Input: raw and cleaned DataFrames. Output: dict with key counts — original rows, duplicates removed, final rows, unique transactions, customers, items.

build_customer_features(df)
Input: cleaned DataFrame. Output: one-row-per-customer DataFrame with 10 columns.
•	Aggregates: TotalTransactions, TotalItems, UniqueItems, AvgBasketSize, FavouriteCategory, ActiveDays
•	Computes: ItemsPerTransaction, DiversityScore
•	Joins: CustomerClass (majority BasketClass across all transactions)
•	Used by: page_classify.py (classification target + features) and page_cluster.py (clustering input)

CATEGORY_MAP
Module-level dictionary mapping all 167 itemDescription strings to one of 10 category strings. Applied in clean_data() via df['Category'] = df['itemDescription'].map(CATEGORY_MAP).fillna('Other').

8.2 utils/warehouse.py
build_warehouse(df)
Input: cleaned DataFrame. Creates/replaces all 4 tables. dim_customer is built by calling build_customer_features() internally, so no pre-computation needed.

warehouse_exists()
Returns True if fact_purchases table exists. Used by pages to check if ETL has been run.

query_warehouse(sql)
Input: SQL string. Output: pandas DataFrame. Convenience wrapper for direct SQLite queries on warehouse.db.
 
9. Navigation & User Guide
9.1 Page-by-Page Guide
Page	What to do	What you see
Home	No action needed	KPIs, module cards, dataset column guide
Dataset	Adjust row slider, pick a customer	Preview, column info, item analysis, basket viewer
Preprocessing	Click Run Preprocessing, then Build Warehouse	9-step report, clean preview, category dist.
Exploration	Click tabs, adjust sliders (item count, granularity)	5 chart tabs including co-purchase heatmap
Association	Set support/confidence/lift, pick algorithm, click Mine	Rules table, network, lift chart, comparison
Classification	Select features, click Run All 4 Classifiers	Comparison table, confusion matrices, metrics
Clustering	Run Elbow, set k, run K-Means and Hierarchical	3 scatters, radar chart, dendrogram, profiles

9.2 Association Mining Tuning Guide
The most important page to tune correctly — grocery data needs different settings than standard retail:
•	Start with support=0.005, confidence=0.10, lift=1.0 — this gives the most rules
•	Increase support (0.01, 0.02) to see only the strongest itemsets
•	Increase lift filter (1.5, 2.0) to remove weak associations
•	Run Both algorithms to show the comparison tab in your presentation
•	Use the full 14,963 transactions for the most comprehensive results

9.3 Classification Tuning
•	Default features (all 7) give the best accuracy — AvgBasketSize is the strongest predictor
•	The dataset has class imbalance: Small=2,453, Medium=1,098, Large=347
•	F1-Score is a better metric than accuracy due to this imbalance
•	Random Forest handles imbalance better than Naive Bayes
 
10. Results & Findings
10.1 Classification Results
Algorithm	Accuracy	Precision	Recall	F1-Score
Decision Tree	92.56%	92.4%	92.6%	92.4%
Random Forest	96.67%	96.6%	96.7%	96.6%
Naive Bayes	75.64%	74.9%	75.6%	73.1%
K-Nearest Neighbour	92.18%	92.0%	92.2%	91.9%

Key finding: Random Forest achieves 96.67% accuracy. Naive Bayes scores 75.64% — higher than Group 1's 52% because customer-level features (e.g. TotalTransactions, AvgBasketSize) are more statistically independent than raw transaction features.

10.2 Clustering Results
•	K-Means with k=4 achieved silhouette score 0.35 — lower than Group 1's 0.61 because purchase behaviour is inherently less separable than monetary RFM
•	Cluster 0 — Loyal High-Value Shoppers: high transactions, high total items, high unique items
•	Cluster 1 — Quick-Trip Shoppers: low transactions, very small basket size, low diversity
•	Cluster 2 — Explorers: high diversity score, medium frequency, medium unique items
•	Cluster 3 — Infrequent Visitors: low everything — rare or one-time shoppers

10.3 Association Results
•	With 14,963 transactions, support=0.005, confidence=0.10: 126 frequent itemsets, 19 rules
•	Top rule example: whole milk → other vegetables (frequently co-purchased staples)
•	Max lift found: 1.116 — modest but real association (grocery baskets are naturally diverse)
•	FP-Growth produces identical rules in significantly less computation time

10.4 Business Recommendations
9.	Place whole milk, other vegetables, and rolls/buns at the store entrance — top 3 items
10.	Position high-association pairs (e.g. dairy + produce) in adjacent aisles
11.	Offer bundle deals for the top 10 rule pairs discovered by FP-Growth
12.	Target Cluster 1 (Quick-Trip) with express checkout lanes and convenience promotions
13.	Reward Cluster 0 (Loyal High-Value) with a loyalty card tier offering exclusive discounts
14.	Investigate Cluster 3 (Infrequent) for re-engagement campaigns via app push notifications
15.	Stock associated items together in the warehouse to reduce restocking delays
 
11. Troubleshooting
Problem	Solution
ModuleNotFoundError	Run: pip install -r requirements.txt
Dataset not found	Ensure Groceries_dataset.csv is in the data/ folder
No rules found in Association	Lower support to 0.003 or 0.001, lower confidence to 0.05
Rules all have lift < 1	Lower the lift filter to 0.8, or lower min_confidence
Classification page empty	Run Preprocessing first to populate session state
Heatmap very slow	Reduce items slider to 10–12 instead of 30
Clustering silhouette is low	Normal for behavioural data — 0.3 is acceptable. Try different k values
Dendrogram appears blank	Matplotlib requires a fresh render — navigate away and back
Session state lost on refresh	Re-run Preprocessing — warehouse.db persists but in-memory DataFrame does not
 
12. Presentation Guide (15 Slides)
#	Slide Title	Content
1	Title Slide	Project name, course, group number, date, lecturer
2	Problem & Objectives	Why basket analysis matters — product placement, promotions, revenue
3	Dataset Overview	38,765 records, 3 columns, 167 items, 14,963 baskets — show column table
4	Data Warehouse Design	Star schema: fact_purchases + 3 dimension tables, ETL flow
5	ETL & Preprocessing	9 cleaning steps, CATEGORY_MAP, feature engineering, row counts
6	Data Exploration	LIVE DEMO — item frequency bar chart, category pie, co-purchase heatmap
7	Association Mining — Theory	What is market basket analysis? Support, confidence, lift explained with examples
8	Basket Matrix	Show how 14,963 × 167 binary matrix is built from transactions
9	Association Results	LIVE DEMO — run Apriori + FP-Growth, show rules table, network graph
10	Classification — Theory	What are we predicting? CustomerClass definition, 6 features explained
11	Classification Results	LIVE DEMO — run classifiers, show comparison table, confusion matrix
12	Clustering — Theory	What is clustering? 6 customer features, what segments mean for supermarket
13	Clustering Results	LIVE DEMO — elbow, K-Means, radar chart, customer profiles
14	Business Recommendations	7 actionable insights from the mining results
15	Conclusion & Q&A	Summary, limitations (small basket size, no price data), future work

12.1 Demo Tips
•	Pre-run Preprocessing before presenting so session state is ready
•	Start live demo on Exploration page — co-purchase heatmap is the most visually striking
•	For Association: use Both algorithm, support=0.005, confidence=0.10, all 14,963 transactions
•	For Classification: use default features — Random Forest will clearly win
•	For Clustering: run elbow chart first, then set k=4 and run K-Means
•	Have the rules table and network graph visible simultaneously — switch tabs during Q&A
•	Prepare a backup: screenshot every page result in case of Wi-Fi issues
 
13. Project Report Writing Guide
Structure your written report to match the project brief requirements. Use screenshots from the live dashboard to provide evidence of results.
16.	Brief introduction: problem (supermarket managers lack product insight), objectives, application
17.	Dataset description: 3 columns, 38,765 rows, 167 items, 14,963 transactions, date range
18.	Data warehouse design: star schema diagram, 4 table definitions, ETL flow diagram
19.	ETL process: all 9 steps with before/after row counts
20.	Implementation of data mining techniques: Association (PRIMARY), Classification, Clustering
21.	Model outputs: screenshots of rules table, confusion matrix, cluster profiles, heatmap
22.	Evaluation metrics: report support/confidence/lift for association; accuracy/F1 for classification; silhouette for clustering
23.	Short conclusion: patterns found, business value, limitations

For distinction:
•	Algorithm comparison: Apriori vs FP-Growth (same rules, different speed)
•	Algorithm comparison: Decision Tree vs Random Forest (interpretability vs accuracy trade-off)
•	Limitations: small average basket size (2.59) limits association strength; no price data prevents revenue analysis; dataset covers UK retail patterns only
•	Future work: incorporate pricing data, use sequential pattern mining for time-ordered baskets, deploy recommendation engine
 
14. Quick Reference Card
Command / Item	Value / Description
Run dashboard	streamlit run app.py
Default port	http://localhost:8501
Install dependencies	pip install -r requirements.txt
Dataset file	data/Groceries_dataset.csv
Warehouse file	warehouse.db (auto-created)
Raw rows	38,765
Clean rows	38,006 (759 duplicates removed)
Unique transactions	14,963
Unique customers	3,898
Unique items	167
Item categories	10 (Dairy, Produce, Bakery, etc.)
Avg basket size	2.59 items per transaction
Classification target	CustomerClass (Small / Medium / Large)
Best classifier	Random Forest (96.67% accuracy)
Clustering metric	Silhouette score (0.35 with k=4)
Association default support	0.005 (lower than retail — small baskets)
Association default confidence	0.10
Recommended algorithm	FP-Growth (faster, same rules)
Session state key	clean_df (stores cleaned DataFrame)
Customer features key	build_customer_features(df)

— End of Document —

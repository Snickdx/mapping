const subdomains = {
  "AL-01": "Basic Analysis ",
  "AL-02": "Algorithmic Strategies ",
  "AL-03": "Fundamental Data Structures and Algorithms ",
  "AL-04": "Basic Automata Computability and Complexity",
  "AL-05": "Advanced Computational Complexity",
  "AL-06": "Advanced Automata Theory and Computability ",
  "AL-07": "Advanced Data Structures Algorithms and Analysis ",
  "AR-01": "Digital Logic and Digital Systems ",
  "AR-02": "Machine Level Representation of Data ",
  "AR-03": "Assembly Level Machine Organization ",
  "AR-04": "Memory System Organization and Architecture ",
  "AR-05": "Interfacing and  C ommunication ",
  "AR-06": "Functional Organization ",
  "AR-07": "Multiprocessing and Alternative Architectures ",
  "AR-08": "Performance Enhancements ",
  "CN-01": "Introduction to Modeling and Simulation",
  "CN-02": "Modeling and Simulation ",
  "CN-03": "Processing ",
  "CN-04": "Interactive Visualization ",
  "CN-05": "Data, Information, and Knowledge ",
  "CN-06": "Numerical Analysis ",
  "DS-01": "Sets, Relations, and Functions ",
  "DS-02": "Basic Logic",
  "DS-03": "Proof Techniques ",
  "DS-04": "Basics of Counting",
  "DS-05": "Graphs and Trees ",
  "DS-06": "Discrete Probability ",
  "GV-01": "Fundamental Concepts ",
  "GV-02": "Basic Rendering ",
  "GV-03": "Geometric Modeling ",
  "GV-04": "Advanced Rendering",
  "GV-05": "Computer Animation ",
  "GV-06": "Visualization ",
  "HCI-01": "Foundations ",
  "HCI-02": "Designing Interaction ",
  "HCI-03": "Programming Interactive Systems",
  "HCI-04": "User-Centered Design and Testing",
  "HCI-05": "New Interactive Technologies",
  "HCI-06": "Collaboration and  C ommunication ",
  "HCI-07": "Statistical Methods for HCI",
  "HCI-08": "Human Factors and Security ",
  "HCI-09": "Design-Oriented HCI ",
  "HCI-10": "Mixed, Augmented and Virtual Reality",
  "IAS-01": "Principles of Secure Design",
  "IAS-02": "Defensive Programming",
  "IAS-03": "Threats and Attacks ",
  "IAS-04": "Network Security ",
  "IAS-05": "Cryptography",
  "IAS-06": "Web Security",
  "IAS-07": "Platform Security",
  "IAS-08": "Security Policy and Governance",
  "IAS-09": "Digital Forensics",
  "IAS-10": "Secure Software Engineering",
  "IM-01": "InformationManagementConcepts",
  "IM-02": "Database Systems ",
  "IM-03": "Data Modeling ",
  "IM-04": "Indexing",
  "IM-05": "Relational Databases ",
  "IM-06": "Query Languages ",
  "IM-07": "Transaction Processing ",
  "IM-08": "Distributed Databases ",
  "IM-09": "Physical Database Design ",
  "IM-10": "Data Mining ",
  "IM-11": "Information Storage and Retrieval",
  "IM-12": "Multimedia Systems",
  "IS-01": "Fundamental Issues ",
  "IS-02": "Basic Search Strategies ",
  "IS-03": "Basic Knowledge Representation and Reasoning ",
  "IS-04": "Basic Machine Learning ",
  "IS-05": "Advanced Search ",
  "IS-06": "Advanced Representation and Reasoning",
  "IS-07": "Reasoning Under Uncertainty",
  "IS-08": "Agents ",
  "IS-09": "Natural Language Processing ",
  "IS-10": "Advanced MachineLearning ",
  "IS-11": "Robotics",
  "IS-12": "Perception and Computer Vision ",
  "IS-13": "Introduction ",
  "NC-01": "Networked Applications ",
  "NC-02": "Reliable Data Delivery ",
  "NC-03": "Routing and Forwarding ",
  "NC-04": "Local Area Networks ",
  "NC-05": "Resource Allocation",
  "NC-06": "Mobility",
  "NC-07": "Introduction ",
  "OS-01": "Overview of Operating Systems",
  "OS-02": "Operating System Principles ",
  "OS-03": "Concurrency ",
  "OS-04": "Scheduling and Dispatch ",
  "OS-05": "Memory Management ",
  "OS-06": "Security and Protection ",
  "OS-07": "Virtual Machines ",
  "OS-08": "Device Management",
  "OS-09": "File Systems ",
  "OS-10": "Real Time and Embedded Systems ",
  "OS-11": "Fault Tolerance",
  "OS-12": "System Performance Evaluation",
  "PBD-01": "Introduction ",
  "PBD-02": "Web Platforms",
  "PBD-03": "Mobile Platforms ",
  "PBD-04": "Industrial Platforms ",
  "PBD-05": "Game Platforms ",
  "PD-01": "Parallelism Fundamentals ",
  "PD-02": "Parallel Decomposition ",
  "PD-03": "Communication and Coordination ",
  "PD-04": "Parallel Algorithms, Analysis, and Programming ",
  "PD-05": "Parallel Architecture ",
  "PD-06": "Parallel Performance ",
  "PD-07": "Distributed Systems ",
  "PD-08": "Cloud Computing ",
  "PD-09": "Formal Models and Semantics ",
  "PL-01": "Object-Oriented Programming ",
  "PL-02": "Functional Programming ",
  "PL-03": "Event-Driven and Reactive Programming ",
  "PL-04": "Basic Type Systems ",
  "PL-05": "Program Representation ",
  "PL-06": "Language Translation and Execution ",
  "PL-07": "Syntax Analysis ",
  "PL-08": "Compiler Semantic Analysis ",
  "PL-09": "Code Generation ",
  "PL-10": "Runtime Systems",
  "PL-11": "Static Analysis ",
  "PL-12": "Advanced Programming Constructs ",
  "PL-13": "Concurrency and Parallelism ",
  "PL-14": "Type Systems ",
  "PL-15": "Formal Semantics ",
  "PL-16": "Language Pragmatics ",
  "PL-17": "Logic Programming ",
  "SDF-01": "Algorithms and Design",
  "SDF-02": "Fundamental Programming Concepts ",
  "SDF-03": "Fundamental Data Structures ",
  "SDF-04": "Development Methods ",
  "SE-01": "Software Processes ",
  "SE-02": "Software ProjectManagement ",
  "SE-03": "Tools andEnvironments ",
  "SE-04": "RequirementsEngineering ",
  "SE-05": "Software Design ",
  "SE-06": "Software Construction ",
  "SE-07": "Software Verificationand Validation ",
  "SE-08": "Software Evolution ",
  "SE-09": "Software Reliability ",
  "SE-10": "Formal Methods ",
  "SF-01": "Computational Paradigms ",
  "SF-02": "Cross-Layer Communications ",
  "SF-03": "State and State Machines ",
  "SF-04": "Parallelism ",
  "SF-05": "Evaluation",
  "SF-06": "Resource Allocation and Scheduling ",
  "SF-07": "Proximity ",
  "SF-08": "Virtualization and Isolation ",
  "SF-09": "Reliability through Redundancy ",
  "SF-10": "Quantitative Evaluation",
  "SP-01": "Social Context ",
  "SP-02": "Analytical Tools ",
  "SP-03": "Professional Ethics",
  "SP-04": "Intellectual Property ",
  "SP-05": "Privacy and Civil Liberties ",
  "SP-06": "Professional Communication ",
  "SP-07": "Sustainability ",
  "SP-08": "History",
  "SP-09": "Economies of Computing",
  "SP-10": "Security Policies, Laws and Computer Crimes"
};
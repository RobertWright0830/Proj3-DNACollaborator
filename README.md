# DNACollaborator

## Description

DNACollaborator is a revolutionary web application designed to leverage DNA test data to enhance genealogical research. By allowing users to upload DNA segment data from testing services such as AncestryDNA and 23andMe, DNACollaborator facilitates the identification of shared ancestry, breaks through genealogical "brick walls," and potentially uncovers genetic health markers. With an emphasis on collaboration, DNACollaborator enables users to contribute to a shared ancestral database, reconstructing ancestors' DNA profiles for deeper historical insights.

## Features

- **Dynamic DNA Data Analysis**: Upload and analyze DNA segment data to discover ancestral connections.
- **Ancestral Reconstruction**: Collaborate with others to piece together ancestors' DNA, pushing genealogical research generations further.
- **Interactive Ancestor Cards**: View detailed ancestral profiles via integration with WikiTree.
- **Advanced Data Visualization**: Utilize D3.js for graphical representation of chromosomes and DNA segments.
- **Privacy Controls**: Manage the visibility of your DNA segments with customizable privacy settings.

## Technologies Used

- **Frontend**: React.js, Bootstrap, D3.js (planned)
- **Backend**: Node.js, Express.js, Apollo Server
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **API Integration**: WikiTree API for ancestral data
- **Deployment**: Render

## Installation and Setup

1. Clone the repository:

```bash
git clone git@github.com:RobertWright0830/Proj3-DNACollaborator.git
```

2. Install dependencies:

```bash
cd DNACollaborator
npm install
```

3. Configure environment variables:

Create a `.env` file in the project root and add the following variables:

```env
MONGODB_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret>
```

4. Start the server:

```bash
npm run start
```

5. Access the application at `https://proj3-dnacollaborator.onrender.com`.

## Usage

- **Register and Login**: Securely sign up and log into your personal dashboard.
- **Upload DNA Data**: Upload your DNA segment data file in CSV format.
- **Explore Ancestral Connections**: Use ancestor cards and DNA segment table to analyze and visualize your genetic heritage.
- **Collaborate**: Share and compare DNA segments with other users to uncover shared ancestry.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

- **Developer**: Robert C. Wright - RobertWright0830@aol.com
- **Project Link**: https://github.com/RobertWright0830/Proj3-DNACollaborator

---
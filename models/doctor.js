
const doctors = [
    {
        name: 'Dr. John Doe',
        livestatus: true,
        livestatustext: 'Available',
        degree: 'MD',
        speciality: 'Cardiology',
        gender: 'Male',
        image:"https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000"
    },
    {
        name: 'Dr. Jane Smith',
        livestatus: true,
        livestatustext: 'Available',
        degree: 'DO',
        speciality: 'Pediatrics',
        gender: 'Female',
        image:"https://img.freepik.com/free-photo/portrait-doctor_144627-39390.jpg?w=1060&t=st=1690089676~exp=1690090276~hmac=c14b187c766de85da929bd233ede2e51330d31d6b444ba73e20b4db15ba554de"
    },
    {
        name: 'Dr. Alex Johnson',
        livestatus: false,
        livestatustext: 'Not Available',
        degree: 'MBBS',
        speciality: 'Dermatology',
        email:'kishoree.cse2021@citchennai.net',
        gender: 'Male',
        image:"https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?w=1060&t=st=1690089300~exp=1690089900~hmac=2fb72ca8443b07b9444f9e48d651d2761cb97a41a48b23a8848efc925668ec7d"
    },
    {
        name: 'Dr. Emily Davis',
        livestatus: true,
        livestatustext: 'Available',
        degree: 'MD',
        speciality: 'Obstetrics and Gynecology',
        gender: 'Female',
        image:"https://img.freepik.com/free-photo/expressive-young-woman-posing-studio_176474-66963.jpg?w=1060&t=st=1690089861~exp=1690090461~hmac=be0ce51214fcbe74e1f81f3c16ec18a29339a8709a3c32674ab8b8f859a280d2"
    },
    {
        name: 'Dr. Michael Lee',
        livestatus: true,
        livestatustext: 'Available',
        degree: 'MD',
        speciality: 'Orthopedics',
        gender: 'Male',
        image:"https://img.freepik.com/free-psd/doctor-preparing-routine-medical-check_23-2150493265.jpg?w=1060&t=st=1690089897~exp=1690090497~hmac=969fca0a5962fea7c0c47b88a6c33f83430c3bfab5e47f11dbd704a8da8deb53"
    },
    {
        name: 'Dr. David Wilson',
        livestatus: true,
        livestatustext: 'Available',
        degree: 'DO',
        speciality: 'Family Medicine',
        gender: 'Male',
        image:"https://img.freepik.com/free-photo/portrait-hansome-young-male-doctor-man_171337-5068.jpg?w=1060&t=st=1690089958~exp=1690090558~hmac=8a49c9dcae0ecac37eb1129102e64707e9185479142db153b15efec23a999df9"
      },
      {
        name: 'Dr. Jessica Lee',
        livestatus: false,
        livestatustext: 'Not Available',
        degree: 'MBBS',
        speciality: 'Neurology',
        gender: 'Female',
        email:'kishoree.cse2021@citchennai.net',
        image:"https://img.freepik.com/free-photo/portrait-smiling-young-woman-doctor-healthcare-medical-worker-pointing-fingers-left-showing-clini_1258-88108.jpg?w=1060&t=st=1690090055~exp=1690090655~hmac=d630edeb92e99adc5f4a36ee12d59dadf6bd70d25a53b91769b8254f98f1d1f1"
      },
      {
        name: 'Dr. Andrew White',
        livestatus: true,
        livestatustext: 'Available',
        degree: 'MD',
        speciality: 'Ophthalmology',
        gender: 'Male',
        image:"https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg?w=740&t=st=1690090123~exp=1690090723~hmac=7c63a4c87f73ede435c5ddc3a14577568d53d83f2d69ed4980083e5d698636fd"
      }
    ];

    module.exports = doctors;

// const staticFolderPath = path.join(__dirname, 'static');

// app.use(express.static(staticFolderPath));

// res.sendFile('pages/form.html', { root: staticFolderPath });
// ambil element DOM
const tombolA = document.querySelectorAll('.tombolA');
const tombolB = document.querySelectorAll('.tombolB');
const sapa = document.querySelector('.sapa');
const randomButton = document.querySelector('.random-button');

let nama = '';
const benar = "Benar!";
const salah = "Salah!";
let jmlhBenar = 0, jmlhSalah = 0
let mulai;

// Sapa User
Swal.fire({
  title: 'Submit your name',
  input: 'text',
  showCancelButton: true,
  confirmButtonText: 'Sure'
}).then((result) => {
  if (result.isConfirmed) {
  	if(result.value == null || result.value == '' ) {
  		sapa.innerHTML = 'Halo Player, Selamat Datang!';
  		nama = 'Player';
  	}else{
		sapa.innerHTML = `Halo ${result.value}, Selamat Datang!`;
		nama = result.value;
  	}
  } else if(result.isDismissed) {
  		sapa.innerHTML = '';
  		nama = 'Player';
  }
});

// jawaban / soal
const nomorAtom = [
[
	// 1 - 8 A
	[1, 3, 11, 19, 37, 55, 87],
	[4, 12, 20, 38, 56, 88],
	[5, 13, 31, 49, 81, 113],
	[6, 14, 32, 50, 82, 114],
	[7, 15, 33, 51, 83, 115],
	[8, 16, 34, 52, 84, 116],
	[9, 17, 35, 53, 85, 117],
	[2, 10, 18, 36, 54, 86, 118]
],
[	
	// 1 - 8 B
	[29, 47, 79, 111],
	[30, 48, 80, 112],
	[21, 39, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 89, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104],
	[22, 40, 72, 90],
	[23, 41, 73, 91, 105],
	[24, 42, 74, 92, 106],
	[25, 43, 75, 107, 110],
	[26, 27, 28, 44, 45, 46, 76, 77, 78, 108, 109]
]
];
const simbol = [
[
	// 1 - 8 A
	['H', 'Li', 'Na', 'K', 'Rb', 'Cs', 'Fr'],
	['Be', 'Mg', 'Ca', 'Sr', 'Ba', 'Ra'],
	['B', 'Al', 'Ga', 'In', 'Tl', 'Nh'],
	['C', 'Si', 'Ge', 'Sn', 'Pb', 'Fl'],
	['N', 'P', 'As', 'Sb', 'Bi', 'Mc'],
	['O', 'S', 'Se', 'Te', 'Po', 'Lv'],
	['F', 'Cl', 'Br', 'I', 'At', 'Ts'],
	['He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn', 'Og']
],
[
	// 1 - 8 B
	['Cu','Ag', 'Au', 'Rg'],
	['Zn', 'Cd', 'Hg', 'Cn'],
	['Sc', 'Y', 'La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu', 'Ac', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr', 'Rf'],
	['Ti', 'Zr', 'Hf', 'Th'],
	['V', 'Nb', 'Ta', 'Pa', 'Db'],
	['Cr', 'Mo', 'W', 'U', 'Sg'],
	['Mn', 'Tc', 'Re', 'Bh', 'Ds'],
	['Fe', 'Co', 'Ni', 'Ru', 'Rh', 'Pd', 'Os', 'Ir', 'Pt', 'Hs', 'Mt']
]
];
const jawaban = [
[
	// 1 - 8 A
	['Hydrogenium', 'Lithium', 'Natrium', 'Kalium', 'Rubidium', 'Caesium', 'Francium'],
	['Beryllium', 'Magnesium', 'Calcium', 'Strontium', 'Baryum', 'Radium'],
	['Borum', 'Aluminium', 'Gallium', 'Indium', 'Thallium', 'Nihoniun'],
	['Carboneum', 'Silicium', 'Germanium', 'Stannum', 'Plumbum', 'Flerovium'],
	['Nitrogenium', 'Phosphorus', 'Arsenicum', 'Stibium', 'Bismuthum', 'Moscovium'],
	['Oxygenium', 'Sulphur', 'Selenium', 'Tellurium', 'Polonium', 'Livermorium'],
	['Fluorum', 'Chlorum', 'Bromum', 'Iodium', 'Astatum', 'Tennessine'],
	['Helium', 'Neon', 'Argon', 'Krypton', 'Xenon', 'Radon', 'Oganesson']
],
[
	// 1 - 8 B
	['Cuprum', 'Argentum', 'Aurum', 'Roentgenium'],
	['Zincum', 'Cadmiud', 'Hydrargyrum', 'Copernicium'],
	['Scandium', 'Yttrium', 'Lanthanium', 'Cerium', 'Praseodymium', 'Neodymium', 'Promethium', 'Samarium', 'Europium', 'Gadolinium', 'Terbium', 'Dysprosium', 'Holmium', 'Erbium', 'Thulium', 'Ytterbium', 'Lutecium', 'Actinium', 'Neptunium', 'Plutonium', 'Americium', 'Curium', 'Berkelium', 'Californium', 'Einsteinium', 'Fermium', 'Mendelevium', 'Nobelium', 'Lawrencium', 'Rutherfordium'],
	['Titanium', 'Zirkonium', 'Hafnium', 'Thorium'],
	['Vanadium', 'Niobium', 'Tantalum', 'Protaktinium', 'Dubnium'],
	['Chromium', 'Molybdaneum', 'Wolframium', 'Uranium', 'Seaborgium'],
	['Manganum', 'Tecnetium', 'Rhenium', 'Bohrium', 'Darmstadtium'],
	['Ferrum', 'Cobaltum', 'Niccolum', 'Ruthenium', 'Rhodium', 'Palladium', 'Osmium', 'Iridium', 'Platinium', 'Hassium', 'Meitnerium']
]
];

// semua soal & jawaban
const semuaJawaban = [...jawaban[0], ...jawaban[1]];
const semuaSimbol = [...simbol[0], ...simbol[1]];
const semuaNomorAtom = [...nomorAtom[0], ...nomorAtom[1]];

// mesin untuk menjalankan soal
const tekan = function(nomor, jawabanI, i) {
	mulai = confirm(`Mulai Test Ke-${nomor}`);
	while(mulai){
		alert(`Halo ${nama}! ayo menghafal tabel periodik! \n*Jawab pertanyaannya dengan nama latin!*`);
		jmlhBenar = 0;
		jmlhSalah = 0;
		for(let j = 0; j < jawaban[jawabanI][i].length; j++){
		let tes = prompt(`${j+1}. ${simbol[jawabanI][i][j]} dengan Nomor Atom ${nomorAtom[jawabanI][i][j]}`);
		if(tes == `${jawaban[jawabanI][i][j]}`){
		alert(`${benar}\nJawabannya adalah : ${jawaban[jawabanI][i][j]} dengan simbol "${simbol[jawabanI][i][j]}" dan nomor atom "${nomorAtom[jawabanI][i][j]}"`);
		jmlhBenar++;
		}else{
		alert(`${salah}\nJawabannya adalah : ${jawaban[jawabanI][i][j]} dengan simbol "${simbol[jawabanI][i][j]}" dan nomor atom "${nomorAtom[jawabanI][i][j]}"`);
		jmlhSalah++;
		}
		}
		alert(`Test ${nomor} dengan JUMLAH SOAL : ${jmlhBenar+jmlhSalah}!\nBenar: ${ jmlhBenar},\nSalah : ${jmlhSalah}.`);
		mulai = confirm("coba lagi?");
	}
}


// tombol acak
randomButton.addEventListener('click', function(){
	mulai = confirm('Mulai tes acak!');
	jmlhBenar = 0, jmlhSalah = 0;
	while(mulai) {
	let ngacak = Math.floor(Math.random() * semuaJawaban.length);
	let ngasal = Math.floor(Math.random() * semuaJawaban[ngacak].length);
	let tes = prompt(`${semuaSimbol[ngacak][ngasal]} dengan nomor Atom ${semuaNomorAtom[ngacak][ngasal]}`)
	if(tes == semuaJawaban[ngacak][ngasal]){
		alert(`${benar}\nJawabannya adalah ${semuaJawaban[ngacak][ngasal]} dengan simbol "${semuaSimbol[ngacak][ngasal]}" dan nomor atom "${semuaNomorAtom[ngacak][ngasal]}"`);
		jmlhBenar++;
	}else{
		alert(`${salah}\nJawabannya adalah ${semuaJawaban[ngacak][ngasal]} dengan simbol "${semuaSimbol[ngacak][ngasal]}" dan nomor atom "${semuaNomorAtom[ngacak][ngasal]}"`);
		jmlhSalah++;
	}
	alert(`kamu telah menyelesaikan ${jmlhBenar+jmlhSalah} soal acak\nbenar:${jmlhBenar}\nsalah:${jmlhSalah}`);
	mulai = confirm(`Lanjut ?`)
}
});

// tombol A
tombolA.forEach(function(tom, i){
	tom.addEventListener('click', function(){
		tekan(i+1, 0, i)
	});
});

// tombol B
tombolB.forEach(function(tom, i){
	tom.addEventListener('click', function(){
		tekan(i+1, 1, i)
	});
});

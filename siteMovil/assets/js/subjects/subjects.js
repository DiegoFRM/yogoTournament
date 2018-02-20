

var subjects =
	[
		{
			name:"Health",
			img:"health"
		},
		{
			name:"MATH",
			img:"mathdromeda"
		},
		{
			name:"Coding",
			img:"codus"
		},
		{
			name:"Science",
			img:"science"
		},
		{
			name:"Geography",
			img:"geogra"
		},
		{
			name:"Creativity",
			img:"creat"
		},
		{
			name:"Language",
			img:"wordo"
		}
	]

for(var i = 0; i < subjects.length; i++){
	$("#load-planets").append('<li><img  src="assets/images/planets/'+ subjects[i].img +'.png" alt=""/></li>');	
		
	});
}









const select = (selector) => document.querySelector(selector);

const form = select('.form');
const message = select('.message');

const displayMessage = (text, color) => {
  message.style.visibility = 'visible';
  message.style.backgroundColor = color;
  message.innerText = text;
  setTimeout(() => {
    message.style.visibility = 'hidden';
  }, 3000);
};

const validateForm = () => {
  const title = select('#title').value.trim();
  //trim baştaki boşlukları kaldırmayı sağlar böylece boşluk tuşuyla oluşturulan içerikler boş olarak 
  //değerlendirilir.
  const content = select('#content').value.trim();
  const thumbnail = select('#thumbnail').value;
  const category = select('#category').value;
  const date=select('#date').value;

  const exceptedImageFiles = ['jpg', 'jpeg', 'png'];

  if (!title || !content || !thumbnail || category == '0') {
    // show  some error
    return displayMessage('Field can not be empty', 'red');
  }

  const extension = thumbnail.split('.').pop();
  //seçilen dosyanın uzantısını almayı sağlar
  if (!exceptedImageFiles.includes(extension)) {
    return displayMessage('Image file is not valid', 'red');
  }

  return true;
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validate our form
  const valid = validateForm();

  if (true) {
    // Submit this form
    const formData = new FormData(form);
    //html içerisinde bulunan etiketlerine göre oluşturulur.
    await postData(formData);
  }
});

const resetForm = () => {
  select('#title').value = '';
  select('#content').value = '';
  select('#thumbnail').value = null;
  select('#category').value = '0';
  select('#featured-content').checked = false;
  select('#date').value=null;
};

const postData = async (data) => {
  const result = await fetch('/api/create', {
    method: 'POST',
    body: data,
  });

  if (result.ok) {
    const response = await result.json();
    if (response.success) {
      displayMessage(response.message, 'green');
      //gelen cevap true ise yani işlem başarılı ise 
      //response içerisindeki mesajı ve renk olarakda yeşili
      //displayMessage'a gönderir.
      resetForm();
      //formun sıfırlanmasını sağlar
    }
    if (!response.success) {
      //gelen cevap false ise mesajı kırmzı renk ile displayMessage'a gönderir.
      displayMessage(response.message, 'red');
    }
  }
};

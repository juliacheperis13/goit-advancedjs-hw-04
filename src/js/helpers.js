import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const classes = {
  hidden: 'hidden',
};

const toggleVisibility = (element, isHidden) => {
  if (isHidden) {
    element.classList.add(classes.hidden);
  } else {
    element.classList.remove(classes.hidden);
  }
};

const showMessage = (text, isError) => {
  if (isError) {
    iziToast.error({
      title: 'Error',
      message: text,
      position: 'topRight',
    });
  } else {
    iziToast.success({
      title: 'Success',
      message: text,
      position: 'topRight',
    });
  }
};

export { toggleVisibility, showMessage };

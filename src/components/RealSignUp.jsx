import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axiosInstance from '../api/axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const storeFieldsSchema = yup.object({
  name: yup.string().min(3, 'Mağaza adı en az 3 karakter olmalı').required('Mağaza adı zorunlu'),
  phone: yup.string().matches(/^((\+90)?[ ]?\d{3}[ ]?\d{3}[ ]?\d{4})$/, 'Geçerli bir Türkiye telefon numarası girin').required('Telefon zorunlu'),
  tax_no: yup.string().matches(/^T\d{4}V\d{6}$/,'Vergi numarası "TXXXXVXXXXXX" formatında olmalı').required('Vergi numarası zorunlu'),
  bank_account: yup.string().matches(/^TR\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{0,2}$/,'Geçerli bir IBAN girin').required('IBAN zorunlu'),
});

const schema = yup.object().shape({
  name: yup.string().min(3, 'İsim en az 3 karakter olmalı').required('İsim zorunlu'),
  email: yup.string().email('Geçerli bir email girin').required('Email zorunlu'),
  password: yup.string()
    .min(8, 'Şifre en az 8 karakter olmalı')
    .matches(/[a-z]/, 'Küçük harf içermeli')
    .matches(/[A-Z]/, 'Büyük harf içermeli')
    .matches(/[0-9]/, 'Rakam içermeli')
    .matches(/[^a-zA-Z0-9]/, 'Özel karakter içermeli')
    .required('Şifre zorunlu'),
  password2: yup.string().oneOf([yup.ref('password'), null], 'Şifreler eşleşmiyor'),
  role_id: yup.string().required('Rol seçimi zorunlu'),
  store: yup.object().when(['role_id'], {
    is: (role_id) => role_id === '2',
    then: () => storeFieldsSchema,
    otherwise: () => yup.object().nullable()
  })
});

const RealSignUp = () => {
  const [roles, setRoles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showStoreFields, setShowStoreFields] = useState(false);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { role_id: '' },
  });

  useEffect(() => {
    axiosInstance.get('/roles').then(res => {
      setRoles(res.data);
      // Varsayılan olarak Customer seçili olsun
      if (res.data && res.data.length > 0) {
        reset({ role_id: res.data.find(r => r.name.toLowerCase() === 'customer')?.id?.toString() || res.data[0].id.toString() });
      }
    });
  }, [reset]);

  const role_id = watch('role_id');
  useEffect(() => {
    setShowStoreFields(role_id === '2'); // 2: Store
  }, [role_id]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Kayıt işlemi
      const registerData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: parseInt(data.role_id, 10)
      };

      if (data.role_id === '2' && data.store) {
        registerData.store = {
          name: data.store.name?.trim(),
          phone: data.store.phone?.replace(/\s+/g, ''),
          tax_no: data.store.tax_no?.trim(),
          bank_account: data.store.bank_account?.replace(/\s+/g, '')
        };
      }

      await axiosInstance.post('/signup', registerData);

      // Başarılı kayıt mesajını kullanıcı ismi ile göster
      toast.success(`Hoş geldin ${data.name}! Mail aktivasyonundan sonra giriş yapabilirsin.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
      });

      // Otomatik giriş denemesi
      try {
        const loginResponse = await axiosInstance.post('/login', {
          email: data.email,
          password: data.password
        });

        if (loginResponse.data?.token) {
          localStorage.setItem('token', loginResponse.data.token);
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${loginResponse.data.token}`;
          
          toast.success(`Hoş geldin ${data.name}! Giriş başarılı.`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored"
          });
          
          history.push('/');
        }
      } catch (loginError) {
        console.error('Giriş hatası:', loginError);
        history.push('/signup');
      }
    } catch (err) {
      console.error('Kayıt hatası:', err.response?.data || err);
      
      let errorMessage = 'Kayıt işlemi başarısız oldu.';
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Kayıt Ol</h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700">İsim</label>
              <input {...register('name')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input {...register('email')} type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Şifre</label>
              <input {...register('password')} type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Şifre Tekrar</label>
              <input {...register('password2')} type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              {errors.password2 && <p className="mt-2 text-sm text-red-600">{errors.password2.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rol</label>
              <select {...register('role_id')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
              {errors.role_id && <p className="mt-2 text-sm text-red-600">{errors.role_id.message}</p>}
            </div>
            {showStoreFields && (
              <div className="space-y-4 border-t pt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mağaza Adı</label>
                  <input {...register('store.name')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                  {errors.store?.name && <p className="mt-2 text-sm text-red-600">{errors.store.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mağaza Telefon</label>
                  <input {...register('store.phone')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                  {errors.store?.phone && <p className="mt-2 text-sm text-red-600">{errors.store.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Vergi No</label>
                  <input {...register('store.tax_no')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                  {errors.store?.tax_no && <p className="mt-2 text-sm text-red-600">{errors.store.tax_no.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">IBAN</label>
                  <input {...register('store.bank_account')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                  {errors.store?.bank_account && <p className="mt-2 text-sm text-red-600">{errors.store.bank_account.message}</p>}
                </div>
              </div>
            )}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Kayıt Ol'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RealSignUp;

import { ref } from "vue";

export const useError = () => {
  const error = ref<Type.Err>({ err: "", msg: '' });
  const setErr = ({ err, msg }: Type.Err) => (error.value = { err, msg });
  return { err: error, setErr };
};

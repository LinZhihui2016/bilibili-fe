import { useFlag } from "@/hooks/index";
import { onMounted, ref } from "vue";
import { useError } from "@/hooks/useError";

export interface RequestOpt<Result> {
  delay?: number;
  first?: (res: Type.Res<Result>) => void;
  success?: (res: Type.Res<Result>) => void;
  fail?: (res: Type.Res<Result>) => void;
  final?: (res: Type.Res<Result>) => void;
  before?: () => void;
  manual?: boolean;
}

export const useRequest = <Result>(
    fetch: () => Promise<Type.Res<Result>>,
    {
      delay = 100,
      first = () => {
      },
      success = () => {
      },
      fail = () => {
      },
      final = () => {
      },
      before = () => {
      },
      manual = false
    }: RequestOpt<Result> = {}
) => {
  const [loading, , setLoading] = useFlag(false);
  const result = ref<Result>();
  const { err, setErr } = useError();
  const [load, , setLoad] = useFlag(false);
  const run = () => {
    before();
    setLoading(true);
    fetch()
        .then(res => {
          first(res);
          return res;
        })
        .then(res => {
          if (res.status) {
            result.value = res.data;
            success(res);
          } else {
            setErr(res);
            fail(res);
          }
          return res;
        })
        .then(res => final(res))
        .finally(() => {
          !load.value &&
          (delay ? setTimeout(() => setLoad(true), delay) : setLoad(true));
          delay ? setTimeout(setLoading, delay) : setLoading();
        });
  };
  onMounted(() => !manual && run());
  return { loading, result, err, run, setErr, load };
};

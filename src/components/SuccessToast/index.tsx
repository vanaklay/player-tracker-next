import styles from "./index.module.css";

type SuccessToastProps = {
  message: string;
};
const SuccessToast = ({ message }: SuccessToastProps) => {
  return <div className={styles.success}>{message}</div>;
};

export default SuccessToast;

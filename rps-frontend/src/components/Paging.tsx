import { ceil } from "lodash";
import { CSSProperties, ReactNode, useState } from "react";
import css from './paging.module.css';
import cx from 'classnames';

type PagingProps = {
  index: number;
  count: number;
  children: ReactNode[];
  style?: CSSProperties;
  pageFunc?: (page: number) => void;
};

export default function Paging({ index, count, children, style, pageFunc }: PagingProps) {
  const [page, setPage] = useState(index);

  const maxPage = ceil(children.length / count);
  const content = children.slice((page - 1) * count, (page - 1) * count + count);
  
  const changePage = (page: number) => {
    pageFunc?.call(null, page);
    setPage(page);
  };

  return (
    <div className={css.paging}>
      <div className={css.content} style={style}>
        {content}
      </div>
      <div className={css.buttons}>
        <Button
          text='<'
          disabled={page <= 1}
          onClick={() => changePage(page - 1)}
        />
        <span>{page}</span>
        <Button
          text='>'
          disabled={page >= maxPage}
          onClick={() => changePage(page + 1)}
        />
      </div>
    </div>
  );
}

type ButtonProps = {
  text: string,
  disabled?: boolean,
  onClick?: () => void;
};

function Button({ text, disabled, onClick }: ButtonProps) {
  return <button disabled={disabled} className={css.button} onClick={onClick}>{text}</button>;
}
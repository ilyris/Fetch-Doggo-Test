import { Pagination } from "@mui/material";

interface PaginationComponentProps {
  totalCount: number;
  page: number;
  pageSize: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}
const PaginationComponent: React.FC<PaginationComponentProps> = ({
  totalCount,
  page,
  pageSize,
  onPageChange,
}) => {
  return (
    <Pagination
      sx={{ marginTop: 5, marginBottom: 10 }}
      count={Math.ceil(totalCount / pageSize)}
      page={page}
      color="primary"
      onChange={onPageChange}
    />
  );
};

export default PaginationComponent;

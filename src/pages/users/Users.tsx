import UsersHeader from './users-header/UsersHeader';
import UsersTable from './users-table/UsersTable';

export default function Users() {
  return (
    <main className="flex flex-col items-center">
      <section className="w-full max-w-4/5 px-8 py-16 max-sm:max-w-full">
        <UsersHeader />
        <UsersTable />
      </section>
    </main>
  );
}

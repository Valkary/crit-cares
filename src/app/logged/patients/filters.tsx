'use client';
import { useDebounce } from '@uidotdev/usehooks';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Button } from '~/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import useQueryParams from '~/hooks/useQueryParams';

export default function Filters({
	page,
	total_pages,
}: {
	page: number;
	total_pages: number;
}) {
	const [params, setParams] = useQueryParams();
	const [searchTerm, setSearchTerm] = useState(() => params.search ?? '');
	const debouncedSearchTerm = useDebounce(searchTerm, 300);

	useEffect(() => {
		if (debouncedSearchTerm !== params.search) {
			setParams({ search: debouncedSearchTerm });
		}
	}, [debouncedSearchTerm, params.search, setParams]);

	return (
		<div className="flex justify-end items-center gap-2">
			<div className="flex items-center">
				<Button
					type="button"
					variant={'outline'}
					onClick={() =>
						setParams({ page: ((Number(params.page) || 0) - 1).toString() })
					}
					disabled={page <= 0}
				>
					<ChevronLeftIcon />
				</Button>
				<Button type="button" variant={'ghost'}>
					{Number(page) + 1} de {total_pages}
				</Button>
				<Button
					type="button"
					variant={'outline'}
					onClick={() =>
						setParams({ page: ((Number(params.page) || 0) + 1).toString() })
					}
					disabled={page + 1 >= total_pages}
				>
					<ChevronRightIcon />
				</Button>
			</div>
			<Input
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.currentTarget.value)}
				type="text"
				placeholder="Busqueda..."
			/>
		</div>
	);
}

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type WithPage = {
	page?: number;
};

export default function useQueryParams<T extends WithPage>() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [queryParams, setQueryParams] = useState<Partial<T>>(() => {
		const paramObj: Partial<T> = {} as Partial<T>;
		searchParams.forEach((value, key) => {
			(paramObj as Record<string, string>)[key] = value;
		});
		return paramObj;
	});

	useEffect(() => {
		const queryString = new URLSearchParams(
			queryParams as Record<string, string>,
		).toString();
		router.push(`${pathname}?${queryString}`);
	}, [queryParams, pathname, router]);

	function updateParams(params: Partial<T>) {
		setQueryParams((prev) => {
			const newParams =
				Object.keys(params).length === 0 ? {} : { ...prev, ...params };

			if (params.page === undefined && !('page' in newParams)) {
				(newParams as WithPage).page = 0;
			}

			return newParams;
		});
	}

	function updateNamedParam<K extends keyof T>(param: K, value: T[K]) {
		setQueryParams((prev) => {
			const newParams =
				param !== 'page'
					? { ...prev, page: 0, [param]: value }
					: { ...prev, [param]: value };
			return newParams;
		});
	}

	function deleteNamedParam<K extends keyof T>(param: K) {
		setQueryParams((prev) => ({ ...prev, [param]: '' }));
	}

	return [
		queryParams,
		updateParams,
		updateNamedParam,
		deleteNamedParam,
	] as const;
}

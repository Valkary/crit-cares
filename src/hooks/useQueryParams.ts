import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function useQueryParams() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [queryParams, setQueryParams] = useState<Record<string, string>>(() => {
		const paramObj: Record<string, string> = {};
		searchParams.forEach((value, key) => {
			paramObj[key] = value;
		});
		return paramObj;
	});

	useEffect(() => {
		const queryString = new URLSearchParams(queryParams).toString();
		router.push(`${pathname}?${queryString}`);
	}, [queryParams, pathname, router]);

	function updateParams(params: Record<string, string>) {
		setQueryParams((prev) => {
			const newParams = Object.keys(params).length === 0 ? {} : { ...prev, ...params };

			if (params.page === undefined) newParams.page = '0';
			return newParams;
		});
	}

	return [queryParams, updateParams] as const;
}

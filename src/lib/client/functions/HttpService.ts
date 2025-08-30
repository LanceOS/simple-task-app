import { PUBLIC_URL } from '$env/static/public';

export class HttpService {
	private baseUrl: string;
	private static instance: HttpService;

	private constructor() {
		this.baseUrl = PUBLIC_URL;
	}

	public static getInstance(): HttpService {
		if (!HttpService.instance) {
			HttpService.instance = new HttpService();
		}
		return HttpService.instance;
	}

	private async request<T>(route: string, options: RequestInit): Promise<T | void> {
		const url = `${this.baseUrl}/${route}`;

		try {
			const response = await fetch(url, options);

			if (!response.ok) {
				const errorBody = await response.json().catch(() => null);
				const errorMessage = `HTTP Error: ${response.status} ${response.statusText}`;
				throw new Error(errorBody?.message || errorMessage);
			}

			const contentType = response.headers.get('content-type');
			if (contentType && contentType.includes('application/json')) {
				return (await response.json()) as T;
			}

			return;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public get<T>(route: string): Promise<T> {
		return this.request(route, {
			method: 'GET'
		}) as Promise<T>;
	}

	public put<T, U>(route: string, data: U): Promise<T> {
		return this.request(route, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}) as Promise<T>;
	}

	public post<T, U>(route: string, data: U): Promise<T> {
		return this.request(route, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}) as Promise<T>;
	}

	public delete<U>(route: string, data: U): Promise<void> {
		return this.request(route, {
			method: 'DELETE',
			body: JSON.stringify(data)
		}) as Promise<void>;
	}
}
